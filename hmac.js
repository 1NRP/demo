// Vercel Side function.
import { createHmac, timingSafeEqual } from "node:crypto";

export async function hmac(ctx) {
    // 1. Extract headers
    const timestamp = ctx.req.header("x-auth-timestamp");
    const signature = ctx.req.header("x-auth-signature");
    const clientId = ctx.req.header("x-auth-client-id");

    if (!timestamp || !signature || !clientId) {
        ctx.status(401);
        return ctx.json({ error: "Missing auth headers." });
    }

    // 2. Verify timestamp (60-second window).
    if (Math.abs(Date.now() - Number(timestamp)) > 60000) {
        ctx.status(401);
        return ctx.json({ error: "Expired ctx.request." });
    }

    // 3. Verify HMAC.
    // const expectedSig = createHmac("sha256", process.env.SHARED_SECRET).update(timestamp).digest("hex");
    const expectedSig = createHmac("sha256", 'Sfd789473shjml87Chg7kd78kdc7434hggfkfxxcRET').update(timestamp).digest("hex");
    
    // Use timingSafeEqual (ensure buffers are equal length)
    const signatureBuf = Buffer.from(signature);
    const expectedSigBuf = Buffer.from(expectedSig);

    if (signatureBuf.length !== expectedSigBuf.length) {
        ctx.res.status(401);
        return ctx.json({ error: "Invalid signature length." });
    }
    if (!timingSafeEqual(signatureBuf, expectedSigBuf)) {
        ctx.res.status(401);
        return ctx.json({ error: "Invalid signature." });
    }

    // 4. Verify client ID (optional).
    if (clientId !== "nrp-aws-vps") {
        ctx.res.status(403);
        return ctx.json({ error: "Unauthorized client." });
    }

    return ctx.json({ message: 'Success! The credentials are valid.'});
    
}