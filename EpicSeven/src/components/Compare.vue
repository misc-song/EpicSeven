<template>
    <div>
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div>
                    <div class="float-right">
                        <el-button type="info">信息按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <p></p>
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
</script>

<style scoped>
    .float-right {
        float:right;
    }
</style>