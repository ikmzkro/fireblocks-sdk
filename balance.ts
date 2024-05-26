import * as fs from 'fs';
import * as util from 'util';
import { FireblocksSDK } from 'fireblocks-sdk';
import * as path from 'path';

// ユーザ作成タイミングで取得した秘密鍵ファイルを読み込む
const apiSecret: string = fs.readFileSync(path.resolve("./fireblocks_secret.key"), "utf8");
const apiKey: string = ""

// sandbox用のURLを設定
const baseUrl: string = "https://sandbox-api.fireblocks.io";
const fireblocks: FireblocksSDK = new FireblocksSDK(apiSecret, apiKey, baseUrl);

async function main(): Promise<void> {
  // vaultの情報を取得
  const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(util.inspect(vaultAccounts, false, null, true));

  // vaultIdからassetWalletsを取得
  const vaultId = util.inspect(vaultAccounts, false, null, true)[0].id;
  const assetWallets = await fireblocks.getAssetWallets(vaultId);
  console.log('assetWallets', assetWallets);

  // ✕ vaultAccountIdからvaultAccountを取得
  // const vaultAccount = await fireblocks.getVaultAccountById(vaultId);
  // console.log('assetWallets', vaultAccount);

  // ✕ vaultAccountIdとassetIdから残高取得
  // const vaultAsset = await fireblocks.getVaultAccountAsset("1", "ETH");
  // console.log('vaultAsset', vaultAsset);


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });