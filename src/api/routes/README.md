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

- 🟢 Listar todos os Programas de voluntariado disponíveis `/programs`
- ### Company
    - 🟢 Criar um programa associado a uma Company `/programs/:companyId/create`
    - 🟢 Editar um programa associado a uma Company `PATCH /programs/:programId`
    - 🟢 Deletar um programa associado a uma Company  `DELETE /programs/:programId`
        - Somente com ``status != 'ONGOING'``
    - 🟢 Iniciar Programa `/programs/:programId/start`
    - 🟢 Finalizar Programa `/programs/:programId/start`
    - 🟢 Listar todos os programas criados por uma Company `/programs/:companyId`
- ### Volunteer
    - 🟢 Listar voluntários associados a um Programa `/programs/:programId/applications`
    - 🟢 Aplicar para um Programa `programs/:programId/:volunteerId/apply`
    - 🟢 Retornar a Aplicação de um voluntário específico o qual aplicou para aquele Programa ``
    - 🟢 Listar todos os programas aplicados por um voluntário `/programs/applied/:volunteerId`
    - 🟢 Desistir do programa (excluir aplicação) `/programs/application/:applicationId/giveup`
    - 🟢 Aceitar Aplicação `/application/:applicationId/approves`
    - 🟢 Recusar Aplicação `/application/:applicationId/reject`
        - Não listar na lista de voluntários

- ### Certificado
    - 🔴 Emitir certificado do Programa
    - 🔴 Gerar certificado do Programa