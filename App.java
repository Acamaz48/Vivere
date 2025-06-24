public class App {
    public static void main(String[] args) throws Exception {
        EquipamentoDADOS Dados = new EquipamentoDADOS();

        try {
            List<Equipamento> lista = Dados.listarTodos();
            for (Equipamento eq : lista) {
                System.err.println(eq);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }