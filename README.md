# reportgen
日報自動生成ツール

## インストール方法

```sh
npm install -g @maqfx71/reportgen
```

## 使い方

複数のリポジトリの日報をまとめて生成できます。

```sh
reportgen -r <repo1> <repo2> ... -p <daily|weekly>
```

例:

```sh
reportgen -r ../reportgen ../zettelkasten -p daily
```

- `-r` : レポジトリのパス（複数指定可）
- `-p` : レポート期間（`daily` または `weekly`、デフォルトは `daily`）

## 出力例

```
# 日報 (daily)

## reportgen
【今日の業務内容(gitログ)】
- 2025-10-01 19:34 | fix: 1.0.3 ディレクトリ名のみを表示
  （qureshiagile | 123abc...）
- 2025-10-01 18:58 | Initial commit
  （maqfx71 | 456def...）

## zettelkasten
【今日の業務内容(gitログ)】
- 2025-10-01 19:09 | vault backup: 2025-10-01 19:09:56
  （qureshiagile | 789ghi...）

【明日の予定】
- 

【所感・課題】
- 
```

## 備考

- レポジトリ名はパスの最後のディレクトリ名が表示されます。
- コミットがない場合は「コミットはありませんでした。」と表示されます。
