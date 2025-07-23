import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ShopifySessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const sessionToken = request.headers['authorization'] || request.headers['x-shopify-session-token'];

    if (!sessionToken || typeof sessionToken !== 'string') {
      throw new UnauthorizedException('Missing Shopify session token');
    }

    // TODO: Validate the session token (decode, verify signature, expiry, etc.)
    // For demo, accept any non-empty token
    // You should implement real validation here!
    if (sessionToken.trim().length === 0) {
      throw new UnauthorizedException('Invalid Shopify session token');
    }

    // Optionally attach shop info to request object here
    return true;
  }
} 