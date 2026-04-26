import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

export async function load() {
    const sClient = new Stripe(env.STRIPE_API_KEY)
    const balance = await sClient.balance.retrieve();
    return { balance };
}