import { EntityRepository, Repository, getConnection } from 'typeorm';

import { ComposicaoProduto } from '../entities/composicao-produto.entity';

@EntityRepository(ComposicaoProduto)
export class ComposicaoProdutoRepository extends Repository<ComposicaoProduto> {
    async findComposicaoProdutoById(idEmpresa: number, idProduto: number) {
        return await this.find({ idEmpresa: idEmpresa, idProduto: idProduto });
    }

    async deleteComposicaoProduto(idEmpresa: number, idProduto: number, idMateriaPrima: number) {
        let composicao = await this.findOne({ idEmpresa: idEmpresa, idProduto: idProduto, idMateriaPrima: idMateriaPrima });
        return await this.remove(composicao);
    };

    async updateComposicaoProduto(composicaoProduto: ComposicaoProduto) {
        return await this.save(composicaoProduto);
    };

    async createComposicaoProduto(composicaoProduto: ComposicaoProduto) {
        return await this.save(composicaoProduto);
    };
}
