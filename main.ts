import * as fs from 'fs';
import * as util from 'util';
import {inspect} from 'util';
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

  // アセットのidを取得
  // btcやethやsolなど、アセットによってウォレットの構造が変わるため？な気がする。
  const assetId = vaultAccounts.accounts[0].assets![1]?.id; // ETH_TEST3
  console.log("Asset ID:", assetId);
  // 「QuickStart_Vault」という新規Vaultを作成する
  const vaultCreation = await fireblocks.createVaultAccount("QuickStart_Vault");
  console.log(inspect(vaultCreation, false, null, true));
  const vault = { 
      vaultName: vaultCreation.name,
      vaultID: vaultCreation.id 
  };

  // 新規Vaultに紐づくウォレットを作成
  const vaultWallet = await fireblocks.createVaultAsset(vault.vaultID, assetId);
  console.log("Vault Account Details:", vault);
  console.log("Wallet Asset Details for ", vault.vaultName,":", vaultWallet);
  console.log("Wallet address", vaultWallet.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });