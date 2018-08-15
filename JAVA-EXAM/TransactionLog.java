import java.util.ArrayList;
import java.util.Date;

public class TransactionLog {
    private ArrayList<Transaction> transactions;
    private String user;

    public TransactionLog(String user) {
        this.user = user;
        this.transactions = new ArrayList<Transaction>();
    }

    public void addTransaction(Transaction tr){
        transactions.add(tr);
    }

    public String getUser() {
        return user;
    }

    public float getBalance(){
        float balance = 0;
        for (Transaction tr :transactions) {
            if(tr.getType()==Transaction.Type.DEPOSIT){
                balance += tr.getSum();
            }   else {
                balance -= tr.getSum();
            }
        }
        return balance;
    }

    @Override
    public String toString() {
        String res = "";
        res += String.format("%20s\t%10s\t%10s\t%10s\n", "DATE", "TYPE", "SUM", "TARGET");
        for (Transaction tr :transactions) {
            res += tr + "\n";
        }
        return res;
    }

    public void printDeposits() {
        String res = "";
        res += String.format("%20s\t%10s\t%10s\t%10s\n", "DATE", "TYPE", "SUM", "TARGET");
        for (Transaction tr :transactions) {
            if(tr.getType()==Transaction.Type.DEPOSIT){
                res += tr + "\n";
            }
        }
        System.out.println(res);

    }
    public void printWithdrawals() {
        String res = "";
        res += String.format("%20s\t%10s\t%10s\t%10s\n", "DATE", "TYPE", "SUM", "TARGET");
        for (Transaction tr :transactions) {
            if(tr.getType()==Transaction.Type.WITHDRAWAL){
                res += tr + "\n";
            }
        }
        System.out.println(res);

    }

    public void showTransactionsBefore(Date date) {
        String res = "";
        res += String.format("%20s\t%10s\t%10s\t%10s\n", "DATE", "TYPE", "SUM", "TARGET");
        for (Transaction tr :transactions) {
            if(tr.getDate().compareTo(date) <= 0){
                res += tr + "\n";
            }
        }
        System.out.println(res);
    }
}
