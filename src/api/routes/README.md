# Rotas necessárias no Back-end

> 🟢 Concluído | 🟡 Em andamento | 🔴 Pendente

## Usuário

- 🔴 Login: `
/user/login
`
- 🔴 Logout: `/user/logout`

## Volunteer
- 🟢 Cadastro de Volunteer
- 🟢 Atualizar Volunteer
- 🟢 Deletar Volunteer

## Company

- 🟢 Cadastro de Company
- 🟢 Atualizar Company
- 🟢 Deletar Company

## Certificate

- 🔴 Validar Certificado
- 🔴 Gerar Certificado

## Program

- 🟡 Listar todos os Programas de voluntariado disponíveis
- ### Company
    - 🟡 Criar um programa associado a uma Company
    - 🟡 Editar um programa associado a uma Company
    - 🟡 Deletar um programa associado a uma Company 
        - Somente com ``status != 'ONGOING'``
    - 🟡 Iniciar Programa (mudar `status`)
    - 🟡 Finalizar Programa (mudar `status`)
- ### Volunteer
    - 🟡 Listar voluntários associados a um Programa
    - 🟡 Aplicar para um Programa
    - 🔴 Retornar a Aplicação de um voluntário específico o qual aplicou para aquele Programa
    - 🔴 Listar todos os programas aplicados por um voluntário
    - 🔴 Desistir do programa (excluir aplicação)

- ### Certificado
    - 🔴 Emitir certificado do Programa
    - 🔴 Gerar certificado do Programa