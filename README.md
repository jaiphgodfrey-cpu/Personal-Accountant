# Personal Accountant

A private, offline personal finance tracker. Runs entirely on your device no internet needed after first load, no cloud, no accounts. All data is encrypted and stored locally.

## What it solves

Money is spread across several places and hard to track. Transfers get confused with spending. Loans mix with normal expenses. Old records get lost. This app keeps those parts separate so your financial record stays clear.

## Home

Real time snapshot. Shows total balance, current month allocation, your financial goals, and savings rate. The bell icon turns red after 14 days without a backup download. Tap it to go directly to backup.

## Reports

Financial statements for This Month, Last 6 Months, and This Year. Includes Income Statement, Balance Sheet, Asset Distribution, Cash Flow, Spending Breakdown, Category Trend, Budget Progress, and Reconciliation History. All numbers come from your entries.

## Accounts

Each account you own. Tap to see transaction history, income, expenses, and transfers. Liabilities are listed separately below assets. Net Worth = Total Assets-Total Liabilities.

### Account Overdraft

If a bank or mobile money account goes negative, the app automatically moves it to Liabilities. Negative cash is money owed, not money owned. Cash and crypto accounts cannot go negative; they are zero floored. An overdrawn account returns to Assets once its balance is positive again.

## Transactions

Every entry, newest first. Search by name, account, or category. Filter by date range and type. The summary bar shows totals for visible results. Double tap any entry to edit it. Reconciliation adjustment entries are locked and show a read only view when tapped.

### Transaction Types

- **Income** adds money to an account.
- **Expense** reduces it.
- **Transfer** moves money between your accounts without changing total wealth excluded from income and expense totals.
- **Loan Payment** reduces a liability and the account used to pay it, not counted as an expense.

## Liabilities

Tracks loans and amounts owed. Add a liability with a name, amount, type, and date. Linking it to a deposit account auto-creates the income entry when the loan is received. Reduce a liability by recording a Loan Payment. Liabilities are separated from assets so net worth is always accurate.

## Budgets

Set monthly spending limits for any category. Budget progress is visible in Reports and scales with the selected period. A color shift from indigo to red shows when you are approaching or exceeding the limit.

## Goals

Financial targets such as emergency fund, school fees, or land. Three types:
- **Single Account** tracks one account balance
- **Split** divides the target across multiple accounts by percentage
- **Net Worth** tracks your total net worth

Goals appear on Home and show progress, months remaining, and whether you are on track.

## Reconciliation

If the system balance and the real balance do not match, open the account in Accounts and tap Reconcile. Enter the actual balance and the app posts an adjustment entry to close the gap. Adjustment entries are locked. To correct one, run a new reconciliation.

## Savings Rate

Shown on the Home screen. Calculated as (Income minus Expenses) divided by Income. Displayed for This Month, Last 3 Months, and This Year. Above 20% shows in indigo. Below 0% means you spent more than you earned.

## How Numbers Connect

Every figure flows from your entries. Account balance = opening balance plus and minus all entries for that account. Reports = entries filtered by period. Net worth = assets minus liabilities. Change one entry and everything updates automatically.

## Backup and Restore

**Export** downloads a full CSV spreadsheet with balance sheet, transactions, account statements, audit log, and reconciliation history.

**Copy** copies a readable summary plus full JSON to your clipboard — paste it anywhere to save.

To restore, paste the copied text into the Import field in Settings → Data & Backup.

The bell icon on Home turns red after 14 days without a backup.

## Audit Log

Every edit and deletion is recorded. When you edit an entry, its original values are preserved alongside the update. When you delete one, it is soft-deleted with a timestamp. The audit log is included in CSV exports.

## Security

Your PIN is hashed with PBKDF2 at 100,000 iterations. All data is encrypted with AES-256-GCM derived from your PIN. An HMAC integrity check detects any modification made outside the app. After 5 wrong PIN attempts the app applies exponential backoff lockouts. It auto-locks after 5 minutes of inactivity and immediately when you switch away from the app.

## Installing as an App

This app supports PWA installation. When opened at an https:// URL in Chrome on Android, tap the browser menu and choose **Install App** or **Add to Home Screen**. Once installed it opens full screen with no browser bar and works completely offline.
