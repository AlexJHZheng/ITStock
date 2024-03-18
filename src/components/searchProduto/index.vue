<template>
  <el-container>
    <el-header>pagina consulta</el-header>
    <el-main>
      <div>
        <el-row>
          <el-col :span="20">
            <el-input
              placeholder="codico...descricao...etc..."
              v-model="searchText"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">Search</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          v-if="tableData.length > 0"
          fit="true"
        >
          <el-table-column prop="Type" label="Modelo" :min-width="100">
          </el-table-column>
          <el-table-column prop="pfullname" label="Descricao" :min-width="300">
          </el-table-column>
          <el-table-column prop="Standard" label="Uni/cx"> </el-table-column>
          <el-table-column prop="Qty" label="Qty"> </el-table-column>
          <el-table-column prop="SaleQty" label="Disponivel"> </el-table-column>
          <el-table-column prop="ImportQty" label="Import"> </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { searchProdutos } from "@/api/produto";
export default {
  // 在这里编写你的脚本代码
  name: "MainHome",
  props: {
    msg: String,
  },
  data() {
    return {
      tableData: [],
      searchText: "",
    };
  },
  watch: {},
  methods: {
    // definindo a cor das linhas
    tableRowClassName({ row, rowIndex }) {
      console.log(row, "row");
      if ((rowIndex + 1) % 4 === 1) {
        return "warning-row";
      } else if ((rowIndex + 1) % 4 === 3) {
        return "success-row";
      }
      return "";
    },
    // buscar produtos
    handleSearch() {
      this.tableData = [];
      searchProdutos(this.searchText).then((res) => {
        console.log(res.data);
        this.tableData = this.TrasnforCx(res.data);
      });
      this.searchText = "";
    },
    //数据处理，将导入的res.data处理一下，首先将qty,disponiel,importqty分别除UnitQty获得件数，并且判断如果件数大于20则将值更改为disponivel
    TrasnforCx(data) {
      console.log(data, "处理前");
      data.forEach((item) => {
        item.Qty = Math.floor(item.Qty / item.Standard);
        item.SaleQty = Math.floor(item.SaleQty / item.Standard);
        item.ImportQty = Math.floor(item.ImportQty / item.Standard);
        if (item.Qty > 30) {
          item.Qty = "disponivel";
        } else if (item.Qty === 0) {
          item.Qty = "--";
        } else {
          item.Qty = item.Qty + "CX";
        }

        if (item.SaleQty > 30) {
          item.SaleQty = "disponivel";
        } else if (item.SaleQty === 0) {
          item.SaleQty = "--";
        } else {
          item.SaleQty = item.SaleQty + "CX";
        }

        if (item.ImportQty > 30) {
          item.ImportQty = "disponivel";
        } else if (item.ImportQty === 0) {
          item.ImportQty = "--";
        } else {
          item.ImportQty = item.ImportQty + "CX";
        }
      });
      console.log(data, "处理后");
      return data;
    },
  },
};
</script>

<style>
/* 在这里编写你的样式代码 */
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
