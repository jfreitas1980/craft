//ANDERSON RODRIGUES - 02.02.2014 - 13:40
//-2WA    
    //PROCEDURE USADA PELA TABELA PRINCIPAL DO DICIONARIO DE DADOS
    Procedure p_FFOperation Integer iOper

        //------------------------------------------------------------
        //---Configurando os dados Usuario Que Esta Cadastrando

        Clear   CSAG311
        Move (psUsuarioSessao(Self))         to CSAG311.USUARIOSESSAO
        Find Eq CSAG311                      by 1
        If (Found) Begin
            Send p_FileFieldOperation ;
                 iOper ;
                (psProgramName(Self));
                 CSAG311.USUARIOECODIGO;
                (Trim(CSAG311.USUARIOEMPRESA)); 
                 CSAG311.USUARIONUMERO;
                (Trim(CSAG311.USUARIONOME));
                (Trim(CSAG311.USUARIOSESSAO));
                (Trim(CSAG311.USUARIOIP))
        End
    End_Procedure // p_FFOperation

    
    //PROCEDURE USADA PELA(S) TABELA(S) SECUNDARIA(S) DO DICIONARIO DE DADOS
    //UTILIZE ESTA PROCEDURE PARA ARMAZENAR LOG(S) DA(S) TABELA(S) SECUNDARIA(S)
    //VIDE EXEMPLO cCSAG371DataDictionary.dd
    Procedure p_FFOperationTable Integer iOper Integer iTable

        //------------------------------------------------------------
        //---Configurando os dados Usuario Que Esta Cadastrando

        Clear   CSAG311
        Move (psUsuarioSessao(Self))         to CSAG311.USUARIOSESSAO
        Find Eq CSAG311                      by 1
        If (Found) Begin
            Send p_FileFieldOperationTable;
                 iTable;
                 iOper;
                (psProgramName(Self));
                 CSAG311.USUARIOECODIGO;
                (Trim(CSAG311.USUARIOEMPRESA)); 
                 CSAG311.USUARIONUMERO;
                (Trim(CSAG311.USUARIONOME));
                (Trim(CSAG311.USUARIOSESSAO));
                (Trim(CSAG311.USUARIOIP))
        End
    End_Procedure // p_FFOperationTable
    
