<template>
    <div class="home">
        <!--  <h1>{{ msg }}</h1>-->
        <!--<p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a>.</p>-->

        <el-row :gutter="10">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <h1>第七史诗团战汇报工具</h1>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="margin-12">
                    <div class="custom-control custom-switch float-right">
                        <input type="checkbox" id="darkSwitch" class="custom-control-input">
                        <label for="darkSwitch" class="custom-control-label">深色模式</label>
                    </div>
                    <div class="locale-changer mr-3 float-right ">
                        <select id="locale-changer">
                            <option value="en">English</option>
                            <option value="fr">
                                Français
                            </option>
                            <option value="cn">
                                简体中文
                            </option>
                            <option value="tw">繁體中文</option>
                        </select>
                    </div>
                </div>
            </el-col>
        </el-row>
        <hr />
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div>
                    <el-input placeholder="请输入内容">

                    </el-input>

                </div>
            </el-col>
        </el-row>
        <p></p>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="P1" name="first">
                        <P1 v-if="Object.keys(heroList).length,Object.keys(artifactList).length" v-bind:heroList="heroList" v-bind:artifactList="artifactList" @transferData="CalcuData"></P1>
                    </el-tab-pane>
                    <el-tab-pane label="P2" name="second">
                        <P2 v-if="Object.keys(heroList).length,Object.keys(artifactList).length" v-bind:heroList="heroList" v-bind:artifactList="artifactList" @transferData="CalcuData"></P2>
                    </el-tab-pane>
                    <!--<el-tab-pane label="生成报告" name="third">
                        <Compare></Compare>
                    </el-tab-pane>-->
                </el-tabs>
            </el-col>
        </el-row>
        <hr />

        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="float-middle ">
                    <el-button type="primary" @click="SendDataToServerEvent">提交数据</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import P1 from './P1.vue';
    import P2 from './P2.vue';
    //import Compare from './Compare.vue';

    export default {
        name: 'Home',
        props: {
            msg: String,


        },
        data() {
            return {
                activeName: 'first',
                heroList: {},
                artifactList: {},
                result: "",
                dataToServer: {},

            };
        },
        components: {
            P1,
            P2,
            //Compare
        },
        methods: {
            handleClick(tab, event) {
                //console.log(tab, event);
            },
            calcuSpeed: function (enemy, baseSpeed, crBonus = 0, crPush = 0) {
                var speedRange = '';
                if (enemy.cr && baseSpeed) {
                    let cr = enemy.outspeed === true ? parseInt(enemy.cr) + 100 : enemy.cr;
                    cr = crBonus > 0 ? parseInt(cr) / (parseInt(crBonus) + 100) : cr;
                    cr = crPush > 0 ? parseInt(cr) - parseInt(crPush) : cr;
                    let speed = crBonus > 0 ? Math.round(cr * baseSpeed) : Math.round((cr * baseSpeed) / 100);
                    speedRange = speed + '-' + Math.round(speed / 0.95);
                }
                return speedRange;
            },
            formatHp: function (num) {
                return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
            },
            CalcuData(tp1, tn1, f1, ef1, ef2, ef3, tp2, tn2, f2, es1, es2, es3) {
                try {
                    var array1 = [];
                    var array2 = [];
                    var res = [];
                    this.dataToServer.id = "d3900b84-3c63-407a-aa7a-fa99d774aff2";
                    this.dataToServer.detailId = "";
                    this.dataToServer.towerType = tp1;
                    this.dataToServer.towerName = tn1;

                    //  dataToServer.detail =;
                    array1.push({
                        heroName: ef1.Detail.name,
                        heroId: ef1.Detail.id,
                        throneName: ef1.artifact.name,
                        throneId: ef1.artifact.id,
                        spead: this.calcuSpeed(ef1, f1.speed, f1.crBonus, f1.crPush),
                        health: ef1.hp,
                        equip: ef1.counter == true ? "反击" : "" + '-' + ef1.immunity == true ? "免疫" : ""

                    });
                    array1.push({
                        heroName: ef2.Detail.name,
                        heroId: ef2.Detail.id,
                        throneName: ef2.artifact.name,
                        throneId: ef2.artifact.id,
                        spead: this.calcuSpeed(ef2, f1.speed, f1.crBonus, f1.crPush),
                        health: ef2.hp,
                        equip: ef2.counter == true ? "反击" : "" + '-' + ef2.immunity == true ? "免疫" : ""
                    });
                    array1.push({
                        heroName: ef3.Detail.name,
                        heroId: ef3.Detail.id,
                        throneName: ef3.artifact.name,
                        throneId: ef3.artifact.id,
                        spead: this.calcuSpeed(ef3, f1.speed, f1.crBonus, f1.crPush),
                        health: ef3.hp,
                        equip: ef3.counter == true ? "反击" : "" + '-' + ef3.immunity == true ? "免疫" : ""
                    });
                    array2.push({
                        heroName: es1.Detail.name,
                        heroId: es1.Detail.id,
                        throneName: es1.artifact.name,
                        throneId: es1.artifact.id,
                        spead: this.calcuSpeed(es1, f2.speed, f2.crBonus, f2.crPush),
                        health: es1.hp,
                        equip: es1.counter == true ? "反击" : "" + '-' + es1.immunity == true ? "免疫" : ""

                    });
                    array2.push({
                        heroName: es2.Detail.name,
                        heroId: es2.Detail.id,
                        throneName: es2.artifact.name,
                        throneId: es2.artifact.id,
                        spead: this.calcuSpeed(es2, f2.speed, f2.crBonus, f2.crPush),
                        health: es2.hp,
                        equip: es2.counter == true ? "反击" : "" + '-' + es2.immunity == true ? "免疫" : ""
                    });
                    array2.push({
                        heroName: es3.Detail.name,
                        heroId: es3.Detail.id,
                        throneName: es3.artifact.name,
                        throneId: es3.artifact.id,
                        spead: this.calcuSpeed(es3, f2.speed, f2.crBonus, f2.crPush),
                        health: es3.hp,
                        equip: es3.counter == true ? "反击" : "" + '-' + es3.immunity == true ? "免疫" : ""

                    });
                    res.push(array1);
                    res.push(array2);
                    this.dataToServer.details = res;
                    //console.log(tp1);
                    //console.log(tn1);
                    //console.log(tp2);
                    //console.log(tn2);

                    // console.log(//JSON.stringify(this.dataToServer)
                    this.result = "英雄名称：" + f1.Detail.name + "  英雄id：" + f1.Detail.id + "  攻速：" + f1.speed + "  速攻值变化(退条):" + f1.crBonus + "  速攻值变化(拉条)：" + f1.crPush + "\n" +
                        "英雄名称：" + ef1.Detail.name + "  英雄id：" + ef1.Detail.id + "  神器名：" + ef1.artifact.name + "  神器id：" + ef1.artifact.id + "  Hp:" + ef1.hp + "  攻速值：" + ef1.cr + "  被超车：" + ef1.outspeed + "  counter：" + ef1.counter + "  immunity：" + ef1.immunity + "\n" +
                        "英雄名称：" + ef2.Detail.name + "  英雄id：" + ef2.Detail.id + "  神器名：" + ef2.artifact.name + "  神器id：" + ef2.artifact.id + "  Hp:" + ef2.hp + "  攻速值：" + ef2.cr + "  被超车：" + ef2.outspeed + "  counter：" + ef2.counter + "  immunity：" + ef2.immunity + "\n" +
                        "英雄名称：" + ef3.Detail.name + "  英雄id：" + ef3.Detail.id + "  神器名：" + ef3.artifact.name + "  神器id：" + ef3.artifact.id + "  Hp:" + ef3.hp + "  攻速值：" + ef3.cr + "  被超车：" + ef3.outspeed + "  counter：" + ef3.counter + "  immunity：" + ef3.immunity + "\n" +
                        "英雄名称：" + f2.Detail.name + "  英雄id：" + f2.Detail.id + "          攻速：" + f2.speed + "  速攻值变化(退条):" + f2.crBonus + "速攻值变化(拉条)：" + f2.crPush + "\n" +
                        "英雄名称：" + es1.Detail.name + "  英雄id：" + es1.Detail.id + "  神器名：" + es1.artifact.name + "  神器id：" + es1.artifact.id + "  Hp:" + es1.hp + "  攻速值：" + es1.cr + "  被超车：" + es1.outspeed + "  counter：" + es1.counter + "  immunity：" + es1.immunity + "\n" +
                        "英雄名称：" + es2.Detail.name + "  英雄id：" + es2.Detail.id + "  神器名：" + es2.artifact.name + "  神器id：" + es2.artifact.id + "  Hp:" + es2.hp + "  攻速值：" + es2.cr + "  被超车：" + es2.outspeed + "  counter：" + es2.counter + "  immunity：" + es2.immunity + "\n" +
                        "英雄名称：" + es3.Detail.name + "  英雄id：" + es3.Detail.id + "  神器名：" + es3.artifact.name + "  神器id：" + es3.artifact.id + "  Hp:" + es3.hp + "  攻速值：" + es3.cr + "  被超车：" + es3.outspeed + "  counter：" + es3.counter + "  immunity：" + es3.immunity;
                    // );
                    console.log(this.result);
                }
                catch (err) {
                    console.log(err);
                }

            },
            SendDataToServer() {
                console.log("sending");
                this.axios
                    .put('http://121.199.63.115:8130/api/services/app/V1_Gvg/UpdateGvgDetail', this.dataToServer)
                    .then((response) => {
                        //  console.log(response.data);
                    }).catch((response) => {
                        console.log(response);
                    })
                console.log("finish");
            },
            SendDataToServerEvent() {
                if (this.result == "") {
                    alert("当前数据没有改变或者没有填写完整");
                    return;
                }

                const h = this.$createElement;
                console.log(this.result);
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('div', null, this.result),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customerClass: ".message-box",
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.SendDataToServer();//发送数据到服务端
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '提交已取消'
                    });
                });
            }
        },
        //钩子函数 在组建创建完成后调用（用于初始化页面的原始数据）
        created() {
            this.axios
                .get('http://121.199.63.115:8130/api/services/app/V1_Gvg/GetGvgDetail?Id=d3900b84-3c63-407a-aa7a-fa99d774aff2')
                .then((response) => {
                    //console.log(response.data);

                    // this.result = response.data;

                }).catch((response) => {
                    console.log(response);
                })
            //获取所有的神器
            this.axios
                .post('http://121.199.63.115:8130/api/services/app/V1_Hero/QueryArtifactList')
                .then((response) => {
                    // console.log(response.data);
                    this.artifactList = response.data;

                }).catch((response) => {
                    console.log(response);
                })
            //获取所有的英雄
            this.axios
                .post('http://121.199.63.115:8130/api/services/app/V1_Hero/QueryHeroDtoList')
                .then((response) => {
                    // console.log(response.data);
                    this.heroList = response.data;

                }).catch((response) => {
                    // console.log(response);
                })

        },

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        margin: 0;
        font-size: 2.5rem;
        line-height: 1.2;
        font-weight: 500;
    }

    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0,0,0,.1);
    }

    .custom-switch {
        width: 110px;
    }


    .float-right {
        float: right;
    }

    .float-middle {
        margin: 0 auto;
        width: 100px;
    }

    .margin-12 {
        margin-top: 12px;
    }

    .col-md-6 {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }

    .message-box {
        min-width: 700px;
    }
</style>

