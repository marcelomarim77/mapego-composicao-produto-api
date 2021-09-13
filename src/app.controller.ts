import { Controller, Get, Param, Delete, Put, Body, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ComposicaoProduto } from './entities/composicao-produto.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    @Get('/idEmpresa/:idEmpresa/idProduto/:idProduto')
    async getComposicaoProdutoById(@Param('idEmpresa') idEmpresa: number, @Param('idProduto') idProduto: number) {
        return this.appService.getComposicaoProdutoById(idEmpresa, idProduto);
    }

    @Delete('/idEmpresa/:idEmpresa/idProduto/:idProduto/idMateriaPrima/:idMateriaPrima')
    async deleteComposicaoProduto(@Param('idEmpresa') idEmpresa: number, @Param('idProduto') idProduto: number, @Param('idMateriaPrima') idMateriaPrima: number) {
        return this.appService.deleteComposicaoProduto(idEmpresa, idProduto, idMateriaPrima);
    }

    @Put()
    async updateComposicaoProduto(@Body() composicaoProduto: ComposicaoProduto) {
        return this.appService.updateComposicaoProduto(composicaoProduto);
    }

    @Post()
    async createComposicaoProduto(@Body() composicaoProduto: ComposicaoProduto) {
        return this.appService.createComposicaoProduto(composicaoProduto);
    }
}
