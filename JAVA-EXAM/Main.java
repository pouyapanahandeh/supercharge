/*
* You have to implement a simple core banking system. Think of your personal bank account experience. When in doubt, go for the simplest solution.

No UI or Web Service is needed. Implement only the business logic behind the user stories.

Requirements / user stories

Deposit and Withdrawal:

The user has to be able to deposit and withdraw certain amount of money from his/her bank account.

Transfer:

The user has to be able to transfer money from his bank account to some other user’s bank account

Transaction history (date, amount, balance):

The user has to be able to get his transaction history with the info about his recent transactions with some attributes such as date, amount and current balance.

Transaction history printing:

The user has to be able to print his transaction history (to the Console).

Transaction history filters (just deposits, withdrawal, date):

The user has to be able to filter his transactions by the direction of the transaction (withdraw or deposit) and by the date of the transaction.
* */

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Main {

    private static TransactionLog log;

    public static void main(String[] args) {
	// write your code here
        System.out.println("Hi. Enter your username:");
        String username = in.next();
        log = new TransactionLog(username);

        while(true){
            int cmd = AskCommand();
            switch (cmd){
                case 1: {
                    deposit();
                    break;
                }
                case 2: {
                    withdraw();
                    break;
                }
                case 3: {
                    transfer();
                    break;
                }
                case 4: {
                    printLog();
                    break;
                }
                case 5: {
                    filterLog();
                    break;
                }
                case 6: {
                    return;
                }
            }
        }
    }

    private static void filterLog() {
        int cmd = AskFilter();
        switch (cmd){
            case 1: {
                log.printDeposits();
                return;
            }
            case 2: {
                log.printWithdrawals();
                return;
            }
            case 3: {
                Date date = null;
                System.out.println("Enter date in format dd/MM/yyyy HH:mm:ss. Example 15/08/2018 12:29:08");
                in.nextLine();
                while(true){
                    try {
                        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
                        String txt = in.nextLine();
                        date = formatter.parse(txt);
                        break;
                    }catch(Exception e){
                        System.out.println("Error! Enter date in format dd/MM/yyyy HH:mm:ss. Example 15/08/2018 12:29:08");
                    }
                }
                log.showTransactionsBefore(date);
                return;
            }
        }
    }

    private static int AskFilter() {
        System.out.println("Enter filter number:");
        System.out.println("1: Show Deposits");
        System.out.println("2: Show Withdrawals");
        System.out.println("3: Show transactions before date");
        int num = -1;
        while(true) {
            try {
                num = in.nextInt();
                if(num < 1 || num > 3){
                    throw new Exception("Wrong input");
                }
                break;
            } catch (Exception e) {
                System.out.println("Error! You should enter number from 1-3");
                in.next();
            }
        }
        return num;
    }

    private static void printLog() {
        System.out.println(log);
    }

    private static void deposit() {
        System.out.println("Enter deposit sum:");
        while (true){
            try {
                float sum = in.nextFloat();
                if(sum <= 0){
                    throw new Exception("Wrong input");
                }
                log.addTransaction(new Transaction(Transaction.Type.DEPOSIT, sum, "SELF("+log.getUser() + ")"));
                break;
            } catch (Exception e) {
                System.out.println("Error! You should enter valid positive number. Example: 123.456");
                in.next();
            }
        }
    }

    private static void withdraw() {
        System.out.println("Enter withdraw sum:");
        while (true){
            try {
                float sum = in.nextFloat();
                if(sum <= 0){
                    System.out.println("Error! You should enter valid positive number. Example: 123.456");
                    continue;
                }
                if(sum > log.getBalance()){
                    System.out.println("Error! You do not have enough balance for this transaction.");
                }
                log.addTransaction(new Transaction(Transaction.Type.WITHDRAWAL, sum, "SELF("+log.getUser() + ")"));
                break;
            } catch (Exception e) {
                System.out.println("Error! You should enter valid positive number. Example: 123.456");
                in.next();
            }
        }
    }

    private static void transfer() {
        System.out.println("Enter transfer sum:");
        float sum = 0;
        while (true){
            try {
                sum = in.nextFloat();
                if(sum <= 0){
                    System.out.println("Error! You should enter valid positive number. Example: 123.456");
                    continue;
                }
                if(sum > log.getBalance()){
                    System.out.println("Error! You do not have enough balance for this transaction.");
                }
                break;
            } catch (Exception e) {
                System.out.println("Error! You should enter valid positive number. Example: 123.456");
                in.next();
            }
        }

        System.out.println("Enter username you want to transer funds to:");
        String user = in.next();
        log.addTransaction(new Transaction(Transaction.Type.TRANSFER, sum, user));
    }

    private static Scanner in = new Scanner(System.in);
    private static int AskCommand(){
        System.out.println("Enter command number:");
        System.out.println("1: Deposit");
        System.out.println("2: withdraw");
        System.out.println("3: Transfer");
        System.out.println("4: Print log");
        System.out.println("5: Filter log");
        System.out.println("6: Quit");
        int num = -1;
        while(true) {
            try {
                num = in.nextInt();
                if(num < 1 || num > 6){
                    throw new Exception("Wrong input");
                }
                break;
            } catch (Exception e) {
                System.out.println("Error! You should enter number from 1-6");
                in.next();
            }
        }
        return num;
    }
}
