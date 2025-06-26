# Vivere
---

# Vivere Entretenimento – Sistema de Controle de Estoque 🛠️

## Sobre a Vivere Entretenimento

A **Vivere Entretenimento** é uma empresa especializada em produção e realização de eventos, com sede na Barra da Tijuca (RJ) e atuação em segmentos como montagem de palcos, sonorização, iluminação, locação de coberturas e estruturas temporárias ([cnpj.biz][1]). Fundada em 2013, com cerca de 50–200 colaboradores, a Vivere opera em diferentes regiões e fornece soluções completas de infraestrutura e produção .

### Pontos fortes:

* Portfólio diversificado de eventos.
* Expertise em montagem, documentação, curadoria artística e comunicação.
* Infraestrutura profissional (palcos, tendas, truss e galpões) ([vivereentretenimento.com.br][2], [br.linkedin.com][3], [vivereentretenimento.com.br][4]).
* Sede na Barra da Tijuca e filial em Maricá ([vivereentretenimento.com.br][4]).

---
### 🎯 Objetivo do Projeto
Este projeto visa criar um sistema de controle de estoque para os equipamentos utilizados pela Vivere nos eventos — como som, luz, palco, cabos, geradores, notebooks, etc. — substituindo processos manuais por automações que facilitam a gestão logística.

Funcionalidades principais:
Cadastro inicial de equipamentos com atributos como nome, tipo, descrição, quantidade disponível e medida.

Controle automatizado de entradas e saídas com registro de data/hora.

Histórico completo de movimentações.

Busca por equipamento (ID ou nome).

Remoção de equipamentos obsoletos.

Listagem apenas dos itens com estoque disponível.
---
### 🛠️ Estrutura do Código
src/
* Equipamentos.java          # Modelo de dados dos itens
* Movimentacoes.java        # Controle de movimentações (data/hora, tipo, qtd)
* Estoque.java              # Lógica de estoque (add, remove, listar, busca)
* EstoqueService.java       # Serviço intermediário (validação + interface CLI)
* App.java                  # Interface via terminal com Scanner
---
### 🚀 Sobre este projeto

Este projeto implementa um sistema em **Python** para controle de estoque de equipamentos, com foco em:

* **Entrada e saída automática** de equipamentos;
* Registro de movimentações com **data e hora**;
* Listagem de equipamentos disponíveis e histórico;
* Contagem de totais de estoque e movimentos;
* Fácil adaptação para interfaces futuras (CLI, GUI, web).

### 🧩 Arquitetura

* `modelos/`: define as classes `Equipamento` e `Movimento`.
* `servicos/estoque.py`: lógica de CRUD de estoque, controle de movimentação e persistência via JSON.
* `app.py`: interface via terminal com menu interativo.
* `data/dados.json`: “banco de dados” local em formato JSON — pode conter dados reais ou de exemplo.

---

### 📘 Funcionalidades principais

* **Adicionar/Remover equipamento**: cadastro completo de itens.
* **Registrar movimento**: entrada ou saída de equipamento, com atualização de estoque automático.
* **Mostrar disponíveis**: lista equipamentos com quantidade > 0.
* **Listar movimentações**: histórico completo de entradas e saídas com horários.
* **Totais**: exibição dos totais de equipamentos e de movimentações.
* **Limpar estoque**: zera todos os dados para testes ou reset.

---



