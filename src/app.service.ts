import { Injectable } from '@nestjs/common';

import { ComposicaoProdutoRepository } from './repositories/composicao-produto-repository';
import { ComposicaoProduto } from './entities/composicao-produto.entity';

@Injectable()
export class AppService {

    constructor(private readonly composicaoProdutoRepository: ComposicaoProdutoRepository) {}

    async getComposicaoProdutoById(idEmpresa: number, idProduto: number) {
        const result = await this.composicaoProdutoRepository.findComposicaoProdutoById(idEmpresa, idProduto);
        return result;
    };

    async deleteComposicaoProduto(idEmpresa: number, idProduto: number, idMateriaPrima: number) {
        const result = await this.composicaoProdutoRepository.deleteComposicaoProduto(idEmpresa, idProduto, idMateriaPrima);
        return result;
    };

    async updateComposicaoProduto(ComposicaoProduto: ComposicaoProduto) {
        const result = await this.composicaoProdutoRepository.updateComposicaoProduto(ComposicaoProduto);
        return result;
    };

    async createComposicaoProduto(ComposicaoProduto: ComposicaoProduto) {
        const result = await this.composicaoProdutoRepository.createComposicaoProduto(ComposicaoProduto);
        return result;
    };
}
