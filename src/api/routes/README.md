# Rotas necessárias no Back-end

> 🟢 Concluído | 🟡 Em andamento | 🔴 Pendente

## Usuário

- 🟢 Login: `
/user/login
`
- 🔴 Logout: `/user/logout`

## Volunteer
- 🟢 Cadastro de Volunteer
- 🟢 Atualizar Volunteer
- 🟢 Deletar Volunteer

## Organization

- 🟢 Cadastro de Organization
- 🟢 Atualizar Organization
- 🟢 Deletar Organization

## Certificate

- 🔴 Validar Certificado
- 🔴 Gerar Certificado
- 🔴 Emitir certificado do Programa

## Program

- 🟢 Listar todos os Programas de voluntariado disponíveis `/programs`
- ### Organization
    - 🟢 Criar um programa associado a uma Organization `/programs/:organizationId/create`
    - 🟢 Editar um programa associado a uma Organization `PATCH /programs/:programId`
    - 🟢 Deletar um programa associado a uma Organization  `DELETE /programs/:programId`
        - Somente com ``status != 'ONGOING'``
    - 🟢 Iniciar Programa `/programs/:programId/start`
        - Um programa só pode iniciar se tiver no mínimo 1 pessoa aprovada
    - 🟢 Finalizar Programa `/programs/:programId/start`
    - 🟢 Listar todos os programas criados por uma Organization `/programs/:organizationId`
- ### Volunteer
    - 🟢 Listar voluntários associados a um Programa `/programs/:programId/applications`
    - 🟢 Aplicar para um Programa `programs/:programId/:volunteerId/apply`
    - 🟢 Retornar a Aplicação de um voluntário específico o qual aplicou para aquele Programa `/application/:volunteerId`
    - 🟢 Listar todos os programas aplicados por um voluntário `/programs/applied/:volunteerId`
    - 🟢 Desistir do programa (excluir aplicação) `/programs/application/:applicationId/giveup`
    - 🟢 Aceitar Aplicação `/application/:applicationId/approves`
    - 🟢 Recusar Aplicação `/application/:applicationId/reject`
        - Não listar na lista de voluntários