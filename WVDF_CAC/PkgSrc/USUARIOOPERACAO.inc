//-2WA
//2014-01-20
    #IF (!@ >= 120)
    { Published = True }
    { Description = "" }
    #ENDIF
    Procedure SetUsuariosessao String sStart
        Set psUsuarioSessao to sStart
        Set psPARAMETRO to ''
    End_Procedure // SetUsuariosessao

    // Visual DataFlex 16.1 Migration Utility, added July 28, 2013: 19:16:11
    #IF (!@ >= 120)
    { Published = True }
    { Description = "" }
    #ENDIF
    Procedure SetPrograma String sStart
        Set psPrograma to sStart
    End_Procedure // SetUsuariosessao
