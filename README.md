# 📦 Vivere - Estoque Automação

Sistema de automação para **controle de estoque** da **Vivere Produções**.  
Desenvolvido em **Python** com integração ao **MySQL Workbench**, o projeto organiza o inventário, registra movimentações e permite a montagem de estruturas como **tendas, palcos e galpões**.

---

## ✨ Funcionalidades

- ✅ Registrar **movimentações de entrada e saída** de materiais.  
- ✅ Realizar **conferência do inventário** (comparando banco de dados e planilhas).  
- ✅ Montagem de **estruturas (tenda, palco e galpão)**:
  - Seleção de modelo
  - Escolha e edição dos materiais utilizados  
- ✅ Relatórios tabulados no terminal.  
- ✅ Persistência dos dados em **MySQL**.  
- ✅ Exposição de dados via **API Flask** para integração futura.  

---

## 📂 Estrutura do Projeto
Estoque_automacao/
- app.py # API Flask (inventário, estruturas, movimentos)
- estruturas.py # Funções de leitura e manipulação de estruturas
- importar_csv_mysql.py # Importação de inventário CSV → MySQL
- importar_tendas_mysql.py # Importação de tendas/estruturas → MySQL
- inventario.py # Conferência do inventário
- inventario_vivere.csv # Inventário base em CSV
- Pasta1.xlsx # Arquivo auxiliar (Excel)
- registrar_movimento_estrutura.py # Registro de movimentações de estruturas
- Tendas_Vivere.xlsx # Base de dados principal das tendas

- modelos
  - equipamentos.py # Modelo de equipamentos
 - movimento.py # Modelo de movimentações

- servicos
- │ -estoque.py # Menu principal e serviços do estoque

  -pycache # Arquivos compilados do Python

---

## ⚙️ Tecnologias

- **Python 3.12+**
- **MySQL Workbench**
- **Flask** (API REST)
- **Pandas** (manipulação de dados CSV/Excel)
- **OpenPyXL** (planilhas Excel)
- **Tabulate** (relatórios no terminal)
- **mysql-connector-python** (conexão com MySQL)

---

## 🚀 Instalação e Uso

### 1. Clonar o repositório
```bash
git clone https://github.com/Acamaz48/Vivere.git
cd Vivere/Producoes_Vivere/Estoque_automacao
pip install flask pandas openpyxl tabulate mysql-connector-python
CREATE DATABASE vivere_estoque;
python importar_csv_mysql.py
python importar_tendas_mysql.py
cd servicos
python estoque.py
python app.py




