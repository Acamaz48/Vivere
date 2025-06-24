import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Movimentacoes {
    private static final String CAMINHO_LOG = "movimentacoes";

    public static void registrar(String mensagem) {
        try (FileWriter writer = new FileWriter(CAMINHO_LOG, true)) {
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            writer.write("[" + timestamp + "] " + mensagem + System.lineSeparator());
        } catch (IOException e) {
            System.out.println("[ERRO] Falha ao escrever no log: " + e.getMessage());
        }
    }
}
