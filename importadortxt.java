import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ImportadorTXT {
    public static void importar(String caminhoArquivo, Estoque estoque) {
        try (BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo))) {
            String linha;
            while ((linha = br.readLine()) != null) {
                String[] campos = linha.split(";");
                Equipamento eq = new Equipamento(
                        Integer.parseInt(campos[0]),
                        campos[1],
                        campos[2],
                        campos[3],
                        Integer.parseInt(campos[4]),
                        campos[5]
                );
                estoque.adicionarEquipamento(eq);
            }
        } catch (IOException e) {
            System.out.println("[ERRO] Falha ao ler o arquivo: " + e.getMessage());
        }
    }
}
