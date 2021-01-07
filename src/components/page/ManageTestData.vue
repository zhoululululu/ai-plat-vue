<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 测试数据 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-edit" class="handle-del mr10" style="float: right" @click="handleNewTest"
                    >新增测试数据</el-button
                >
                <el-select v-model="query.intentserchapi" placeholder="选择模型" class="handle-select mr10">
                    <el-option key="1" label="意图" value="intention"></el-option>
                    <el-option key="2" label="项目" value="item"></el-option>
                    <el-option key="3" label="实体" value="ner"></el-option>
                    <el-option key="4" label="相似度" value="similar"></el-option>
                </el-select>
                <el-select v-model="query.intentserchindustry" placeholder="选择科室" class="handle-select mr10">
                    <el-option key="1" label="口腔科" value="口腔科"></el-option>
                    <el-option key="2" label="妇产科" value="妇产科"></el-option>
                    <el-option key="3" label="儿科" value="儿科"></el-option>
                    <el-option key="4" label="妇科" value="妇科"></el-option>
                    <el-option key="5" label="男科" value="男科"></el-option>
                    <el-option key="6" label="眼科" value="眼科"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column prop="api" label="模型"></el-table-column>
                <el-table-column prop="industry" label="科室"></el-table-column>
                <el-table-column prop="data" label="测试数据文件"></el-table-column>
                <el-table-column prop="datanum" label="数据量"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-download" @click="handleEdit(scope.$index, scope.row)">下载详情</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
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

        <!-- 新增测试数据弹出框 -->
        <el-dialog title="新增测试数据" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="选择模型：">
                    <el-select v-model="query.api_name" placeholder="选择模型" class="handle-select mr10">
                        <el-option key="1" label="意图" value="intention"></el-option>
                        <el-option key="2" label="项目" value="itemn"></el-option>
                        <el-option key="3" label="实体" value="ner"></el-option>
                        <el-option key="4" label="相似度" value="similar"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择科室：">
                    <el-select v-model="query.api_industry" placeholder="选择科室" class="handle-select mr10">
                        <el-option key="1" label="口腔科" value="口腔科"></el-option>
                        <el-option key="2" label="妇产科" value="妇产科"></el-option>
                        <el-option key="3" label="儿科" value="儿科"></el-option>
                        <el-option key="4" label="妇科" value="妇科"></el-option>
                        <el-option key="5" label="男科" value="男科"></el-option>
                        <el-option key="6" label="眼科" value="眼科"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传文件：">
                    <el-upload
                        ref="uploadExcel"
                        action
                        :limit="1"
                        :auto-upload="false"
                        accept=".xlsx,.csv,.xls,txt"
                        :before-upload="handleBeforeUpload"
                        :on-change="handlePageChange"
                        :on-exceed="handleExceed"
                        :on-success="saveEdit"
                        :file-list="fileList"
                        :http-request="getFile"
                    >
                        <el-button size="small" plain>选择文件</el-button>
                        <div slot="tip">只能上传xlsx,xls,csv,txt文件,且每次只能选择一个文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="数据条数：">
                    <el-input v-model="query.test_data_num" placeholder="测试数据量" class="handle-input mr10"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUploadForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getTestData, addTestData } from '../../api/manageData.js';
import axios from 'axios';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                api_name: '',
                api_industry: '',
                pageIndex: 0
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            fileList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 tabel数据
        getData() {
            getTestData(this.query).then((res) => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleBeforeUpload(file) {
            console.log('before');
            if (!(file.type === 'excel/csv' || file.type === 'excel/xls' || file.type === 'excel/xlsx')) {
                this.$notify.warning({
                    title: '警告',
                    message: '请上传格式为csv,xlsx,xls等文件'
                });
            }
            let size = file.size / 1024 / 1024 / 2;
            if (size > 100) {
                this.$notify.warning({
                    title: '警告',
                    message: '文件必须大小需小于100M'
                });
            }
        },
        getFile(item) {
            console.log(item.file);
            this.file = item.file;
        },
        // 文件超出个数限制时的钩子
        handleExceed(files, fileList) {},
        // 文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 点击文件列表中已上传的文件时的钩子
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // uploadFile(file) {
        // this.$refs.uploadExcel.submit()
        // let formData = new FormData()
        // formData.append('api_name', this.query.api_name)
        // formData.append('industry',this.query.api_industry)
        // formData.append('file', this.form.file)
        // formData.append('data_num',this.query.test_data_num)
        // this.$axios.post('http://192.168.120.27:8099/add_test_data',
        //     formData,
        //     { "Content-Type": "multipart/form-data" }
        // )
        // .then(res => {
        //     console.log('res')
        //     console.log(res)
        // })
        // .catch(err => {

        // })
        // }
        // 上传文件
        handleUploadForm(param) {
            let thiz = this;
            let formData = new FormData();
            formData.append('api_name', this.query.api_name);
            formData.append('industry', this.query.api_industry);
            formData.append('data_num', this.query.test_data_num);
            formData.append('files', param.file);
            let loading = thiz.$loading({
                lock: true,
                text: '上传中，请稍候...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            thiz.$axios.post('http://192.168.120.27:8099/add_test_data', formData).then(({ data }) => {
                if (data.statusCode === 233) {
                    thiz.$message('上传文件成功，' + data.message);
                    thiz.formFileList = [];
                    thiz.uploadFormFileList = [];
                } else {
                    thiz.formFileList = [];
                    thiz.uploadFormFileList = [];
                    thiz.$message('上传文件失败，' + data.message);
                }
                loading.close();
            });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 新建测试操作
        handleNewTest(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
