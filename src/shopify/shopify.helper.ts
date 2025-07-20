import { GraphQL } from '@bss-sbc/shopify-api-fetcher';
import { GraphqlResult } from './shopify.type';

export function getParams(method: string, accessToken: string) {
    return {
        method: method,
        headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
        },
    };
}

export async function fetchAndRetryIfNecessary(callAPI: () => Promise<any>): Promise<any> {
    try {
        const response = await callAPI();
        return response;
    } catch (error) {
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            const millisToSleep = this.getMillisToSleep(retryAfter);
            await sleep(millisToSleep);
            return fetchAndRetryIfNecessary(callAPI); // Thực hiện lại request.
        }
        throw error; // Ném lỗi nếu không phải lỗi 429.
    }
}

function getMillisToSleep(retryHeaderString: number) {
    let millisToSleep = Math.round(parseFloat(retryHeaderString.toString()) * 1000);
    if (isNaN(millisToSleep)) {
        millisToSleep = 1000;
    }
    return millisToSleep;
}

export function sleep(millis: number) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(`Sleep for ${millis} seconds`);
        }, millis);
    });
}

export const fetchWithRetryBasedOnCost = async (fetchAPI: any) => {
    let retry = true;
    let responseJson: any = null;

    while (retry) {
        responseJson = await fetchAPI();
        if (
            responseJson &&
            responseJson.errors &&
            responseJson.errors.length &&
            responseJson.errors[0]?.extensions?.code === 'THROTTLED'
        ) {
            const requestedQueryCost = responseJson.extensions.cost.requestedQueryCost;
            const currentlyAvailable = responseJson.extensions.cost.throttleStatus.currentlyAvailable;
            const restoreRate = responseJson.extensions.cost.throttleStatus.restoreRate;
            const timeToRestoreCost = Math.ceil((requestedQueryCost - currentlyAvailable) / restoreRate);
            const millisToSleep = getMillisToSleep(timeToRestoreCost);
            await sleep(millisToSleep);
        } else {
            retry = false;
        }
    }
    return responseJson;
};

export async function shopifyGraphqlFetch<T>(
    domain: string,
    access_token: string,
    params: {
        query: string;
        variables?: Record<string, any>;
        identifier?: Record<string, any>;
    }
) {
    return fetchWithRetryBasedOnCost(() => {
        return GraphQL.safeFetch(domain, access_token, params);
    }) as Promise<GraphqlResult<T>>;
}
