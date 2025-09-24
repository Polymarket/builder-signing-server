import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { BuilderSigner } from '@polymarket/builder-signing-sdk';

import { createApp } from './app';


dotenvConfig({ path: resolve(__dirname, "../.env") });

const PORT = Number(process.env.PORT ?? 8080);

const key = process.env.POLY_BUILDER_API_KEY;
const secret = process.env.POLY_BUILDER_SECRET;
const passphrase = process.env.POLY_BUILDER_PASSPHRASE;

if (!key) {
    throw new Error("POLY_BUILDER_API_KEY environment variable is required");
}

if (!secret) {
    throw new Error("POLY_BUILDER_SECRET environment variable is required");
}

if (!passphrase) {
    throw new Error("POLY_BUILDER_PASSPHRASE environment variable is required");
}


const signer = new BuilderSigner({
    key,
    secret,
    passphrase,
});

const app = createApp(signer);


if (require.main === module) {
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Builder signing server listening on :${PORT}`);
    });
}

export default app;
