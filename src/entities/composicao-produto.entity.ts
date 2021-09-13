import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({
    name: 'composicao_produto'
})
export class ComposicaoProduto {

    @PrimaryColumn({
        name: 'id_empresa',
        type: 'int',
    })
    idEmpresa: number;

    @PrimaryColumn({
        name: 'id_produto',
        type: 'int',
    })
    idProduto: number;

    @PrimaryColumn({
        name: 'id_materia_prima',
        type: 'int',
    })
    idMateriaPrima: number;

    @Column({
        name: 'qtde',
        type: 'decimal',
        precision: 18,
        scale: 2,
    })
    qtde: number;
}
