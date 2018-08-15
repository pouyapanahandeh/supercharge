import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Transaction {
    public Transaction(Type type, float sum, String target) {
        this.type = type;
        this.sum = sum;
        this.target = target;
        this.date = new Date();
    }

    enum Type {
        WITHDRAWAL,
        DEPOSIT,
        TRANSFER
    }

    public Type getType() {
        return type;
    }

    public float getSum() {
        return sum;
    }

    public String getTarget() {
        return target;
    }

    private Type type;
    private float sum;
    private String target;

    public Date getDate() {
        return date;
    }

    private Date date;

    @Override
    public String toString() {
        SimpleDateFormat date_formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        DecimalFormat df = new DecimalFormat("#.##");
        String res = "";
        res += String.format("%20s\t%10s\t%10s\t%10s", date_formatter.format(date), type, df.format(sum), target);
        return res;
    }
}
