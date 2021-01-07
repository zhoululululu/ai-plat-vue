<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 意图测试 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    class="handle-del mr10"
                    style="float: right"
                    @click="
                        handleNewTest();
                        industryList();
                    "
                    >新建测试</el-button
                >
                <!-- <el-button type="primary" icon="el-icon-download" class="handle-del mr10" @click="delAllSelection">批量下载</el-button> -->
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-select
                    v-model="selectedSerchIndustry"
                    placeholder="选择科室"
                    class="handle-select mr10"
                    @click="industryList()"
                    @change="changeSerchIndustry($event)"
                >
                    <el-option v-for="(item, i) in industry_list" :key="i" :value="item" v-text="item"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
                <el-button type="primary" icon="el-icon-search" @click="clearSerch()">重置</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="industry" label="科室"></el-table-column>
                <el-table-column prop="data" label="数据量"></el-table-column>
                <el-table-column prop="accuracy" label="准确率"></el-table-column>
                <el-table-column prop="precision" label="precision"></el-table-column>
                <el-table-column prop="recall" label="recall"></el-table-column>
                <el-table-column prop="F1" label="F1"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="el-link"
                            icon="el-icon-download"
                            @click="handledownload(scope.$index, scope.row, scope.row.id)"
                            >下载详情</el-button
                        >
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row, scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 新建测试弹出框 -->
        <el-dialog title="新建意图测试" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="选择科室">
                    <el-select
                        v-model="selectedIndustry"
                        placeholder="选择科室"
                        class="handle-select mr10"
                        @change="
                            changeindustry($event);
                            industryDataList();
                        "
                    >
                        <el-option v-for="(item, i) in industry_list" :key="i" :value="item" v-text="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择数据">
                    <el-select
                        v-model="selectedTestData"
                        placeholder="选择数据"
                        class="handle-select mr10"
                        @change="changeTestData($event)"
                    >
                        <el-option v-for="(item, i) in testData" :key="i" :value="item" v-text="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendTest()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getTestResult, getIndustryList, getIndustryDataList, addTest, deleteTestResult, downloadResult } from '../../api/index';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                api_name: 'intention',
                industry: '',
                pageIndex: 1,
                pageSize: 10
            },
            add_test_query: {
                api_name: 'intention',
                industry: '',
                test_file: ''
            },
            industry_params: {
                api_name: 'intention'
            },
            industry_data_params: {
                api_name: 'intention',
                industry: ''
            },
            add_intention_test: {
                industry: '',
                test_data: ''
            },
            delete_test_result: {
                id: 0
            },
            selectedIndustry: '',
            selectedSerchIndustry: '',
            sentTestResult: '',
            selectedTestData: '',
            testData: [],
            industry_list: [],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            dowloadFile: ''
        };
    },
    created() {
        this.getData();
        this.industryList();
    },
    methods: {
        industryList() {
            getIndustryList(this.industry_params).then((res) => {
                this.industry_list = res;
                console.log(this.industry_list);
            });
        },
        clearSerch() {
            this.query.industry = '';
            this.getData();
            this.selectedSerchIndustry = '';
        },
        changeindustry(event) {
            this.industry_params.industry = this.selectedIndustry; //获取option对应的value值
            this.add_test_query.industry = this.selectedIndustry;
            this.selectedTestData = '';
        },
        changeSerchIndustry(event) {
            this.query.industry = this.selectedSerchIndustry; //获取option对应的value值
        },
        changeTestData(event) {
            this.add_test_query.test_file = this.selectedTestData; //获取option对应的value值
        },
        industryDataList() {
            getIndustryDataList(this.industry_params).then((res) => {
                this.testData = res;
                console.log(this.testData);
            });
        },
        sendTest() {
            console.log(this.add_test_query);
            this.editVisible = false;
            addTest(this.add_test_query).then((res) => {
                this.sentTestResult = res;
                console.log(this.sentTestResult);
                this.getData();
            });
        },
        // 获取测试结果信息
        getData() {
            getTestResult(this.query).then((res) => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row, id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    // this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    this.delete_test_result.id = id;
                    this.godeleteTestResult();
                })
                .catch(() => {});
        },
        godeleteTestResult() {
            deleteTestResult(this.delete_test_result).then((res) => {
                console.log(res);
                if (res.message) {
                    this.$message.success(res.message);
                } else {
                    this.$message.error(res.error);
                }
            });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].id;
                if (i < length - 1) {
                    str += ',';
                }
            }
            this.delete_test_result.id = str;
            this.godeleteTestResult();
            // this.sleep(500);
            // window.location.reload();//刷新当前页面
            this.multipleSelection = [];
            this.getData();
        },
        // 编辑操作
        handledownload(index, row, id) {
            this.delete_test_result.id = id;

            downloadResult(this.delete_test_result)
                .then(
                    (res) => {
                        // 这里使用blob做一个转换
                        let blob = new Blob([res], {
                            type: 'application/vnd.ms-excel'
                        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
                        let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
                        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = '测试结果.xlsx';
                        a.click();
                        // 5.释放这个临时的对象url
                        window.URL.revokeObjectURL(url);
                    },
                    (err) => {
                        resolve(err.response);
                    }
                )
                .catch((error) => {
                    reject(error);
                });
        },
        // 新建测试操作
        handleNewTest(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() - start < delay) {
                continue;
            }
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
