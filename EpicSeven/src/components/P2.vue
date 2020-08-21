<template>
    <div>
        <el-row :gutter="10" style="display:none">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                <el-select value-key="id" v-model="towerType" class="width100" placeholder="请选择塔类型" @change="handleChange">
                    <el-option v-for="item in towerList" :key="item.id" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">

                <el-input v-model="towerName" class="width100" placeholder="请选择塔名称" @change="handleChange">
                </el-input>

            </el-col>
        </el-row>
        <hr />

        <el-row :gutter="10">

            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">

                <el-select value-key="id" v-model="firstHero.Detail" class="width100" filterable placeholder="请选择英雄" @change="handleChange">
                    <el-option v-for="item in heroList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="firstHero.speed" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        速度
                    </template>
                </el-input>
                <span>你输入的英雄速度会保存在本地</span>

            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="firstHero.crBonus" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        % 速攻值变化(退条)
                    </template>
                </el-input>
                <span>例子 : 如果你一速英雄被巴萨尔退条，此处填写30</span>

            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="firstHero.crPush" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        % 速攻值变化(拉条)
                    </template>
                </el-input>
                <span>例子 : 如果你一速英雄被萝季超车拉条，此处填写25</span>
            </el-col>
        </el-row>
        <hr />

        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesFirstHero.Detail" class="width100" filterable placeholder="对方一速">
                    <el-option v-for="item in heroList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesFirstHero.artifact" class="width100" filterable placeholder="神器">
                    <el-option v-for="item in artifactList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesFirstHero.hp" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        生命
                    </template>
                </el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesFirstHero.cr" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        % 速攻值
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <p></p>

        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="form-group">
                    <label data-toggle="tooltip" data-placement="top" title="" data-original-title="对面比我快?">
                        <input type="checkbox" v-model="enemiesFirstHero.outspeed" @change="handleChange"> 被对方超车?
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesFirstHero.counter" @change="handleChange">
                        <img src="../assets/images/Counter.png" />
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesFirstHero.immunity" @change="handleChange">
                        <img src="../assets/images/Immunity.png">
                    </label>
                </div>

            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                <el-input class="width100" v-model="enemiesFirstHero.remark" controls-position="right" @change="handleChange" placeholder="备注..." type="text">

                </el-input>
            </el-col>
        </el-row>
        <hr />

        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesSecondHero.Detail" class="width100" filterable placeholder="对方二速" @change="handleChange">
                    <el-option v-for="item in heroList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesSecondHero.artifact" class="width100" filterable placeholder="神器" @change="handleChange">
                    <el-option v-for="item in artifactList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesSecondHero.hp" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        生命
                    </template>
                </el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesSecondHero.cr" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        % 速攻值
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <p></p>

        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="form-group">
                    <label data-toggle="tooltip" data-placement="top" title="" data-original-title="对面比我快?">
                        <input type="checkbox" v-model="enemiesSecondHero.outspeed" @change="handleChange"> 被对方超车?
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesSecondHero.counter" @change="handleChange">
                        <img src="../assets/images/Counter.png" />
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesSecondHero.immunity" @change="handleChange">
                        <img src="../assets/images/Immunity.png">
                    </label>
                </div>

            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                <el-input class="width100" v-model="enemiesSecondHero.remark" controls-position="right" @change="handleChange" placeholder="备注..." type="text">

                </el-input>
            </el-col>
        </el-row>
        <hr />
        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesThirdHero.Detail" class="width100" filterable placeholder="对方尾速" @change="handleChange">
                    <el-option v-for="item in heroList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-select value-key="id" v-model="enemiesThirdHero.artifact" class="width100" filterable placeholder="神器" @change="handleChange">
                    <el-option v-for="item in artifactList.data" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesThirdHero.hp" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        生命
                    </template>
                </el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-input class="width100" v-model="enemiesThirdHero.cr" controls-position="right" @change="handleChange" :min="1" type="number">
                    <template slot="append">
                        % 速攻值
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <p></p>

        <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="form-group">
                    <label data-toggle="tooltip" data-placement="top" title="" data-original-title="对面比我快?">
                        <input type="checkbox" v-model="enemiesThirdHero.outspeed" @change="handleChange"> 被对方超车?
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesThirdHero.counter" @change="handleChange">
                        <img src="../assets/images/Counter.png" />
                    </label>
                    <label>
                        <input type="checkbox" v-model="enemiesThirdHero.immunity" @change="handleChange">
                        <img src="../assets/images/Immunity.png">
                    </label>
                </div>

            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                <el-input class="width100" v-model="enemiesThirdHero.remark" controls-position="right" @change="handleChange" placeholder="备注..." type="text">

                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                towerType: "",
                towerName: "",
                firstHero: {},
                tempHeroList: {},
                enemiesFirstHero: {
                    Detail: {},
                    artifact: {},
                    hp:"",
                    outspeed: false,
                    counter: false,
                    immunity: false
                },
                enemiesSecondHero: {
                    Detail: {},
                    artifact: {},
                    hp: "",
                    outspeed: false,
                    counter: false,
                    immunity: false
                },
                enemiesThirdHero: {
                    Detail: {},
                    artifact: {},
                    hp: "",
                    outspeed: false,
                    counter: false,
                    immunity: false
                },
                towerList: [{ id: 0, label: '基地', value: 0 }, { id: 1, label: '上路主塔', value: 1 }, { id: 2, label: '中路主塔', value: 2 }, { id: 3, label: '下路主塔', value: 3 }, { id: 4, label: '小塔', value: 4 }],

            };
        },
        props: {
            heroList: {
                type: Object,
            },
            artifactList: {
                type: Object,
            }
        },
        methods: {
            handleChange() {
                this.$bus.emit('UpdateData2', this.towerType, this.towerName, this.firstHero, this.enemiesFirstHero, this.enemiesSecondHero, this.enemiesThirdHero);
            },
            selectData(id) {
                //console.log(this.tempHeroList.data);
                //console.log(this.tempHeroList);
                for (var i = 0; i < this.heroList.data.length; i++) {
                    if (this.heroList.data[i].id == id) {
                       // console.log(this.tempHeroList.data[i]);
                        return this.heroList.data[i];
                    }
                }
                return null;
            },
        },


        created() {
            var that = this;
            //天坑 改变了this指向   var that = this; 保存当前的this
            this.$bus.on('UpdateData1', function (towerType, towerName, firstHero, enemiesFirstHero, enemiesSecondHero, enemiesThirdHero) {
                that.$emit('transferData', towerType, towerName, firstHero, enemiesFirstHero, enemiesSecondHero, enemiesThirdHero, that.towerType, that.towerName, that.firstHero, that.enemiesFirstHero, that.enemiesSecondHero, that.enemiesThirdHero);
            });
            this.$bus.on('FlushData', function (flushdata) {
               // console.log("flushdata" + flushdata.details);

                //  that.towerType = flushdata.towerType;
                //  that.towerName = flushdata.towerName;

                that.enemiesFirstHero.Detail = that.selectData(flushdata.details[1][0].heroId);
                that.enemiesFirstHero.artifact = that.selectData(flushdata.details[1][0].throneId);
                that.enemiesFirstHero.hp = flushdata.details[1][0].health;

                that.enemiesSecondHero.Detail = that.selectData(flushdata.details[1][1].heroId);
                that.enemiesSecondHero.artifact = that.selectData(flushdata.details[1][1].throneId);
                that.enemiesSecondHero.hp = flushdata.details[1][1].health;

                that.enemiesThirdHero.Detail = that.selectData(flushdata.details[1][2].heroId);
                that.enemiesThirdHero.artifact = that.selectData(flushdata.details[1][2].throneId);
                that.enemiesThirdHero.hp = flushdata.details[1][2].health;

            });
        },
        watch: {
            heroList: function (newData, oldData) {
                //console.log(newData)  //newData就是orderData
                this.tempHeroList = newData;
                //	methods的函数在这里调用可以获取到newOrderData的值
                //this.order();
            }
        }
    };
</script>

<style scoped>
    .width100 {
        width: 100%;
    }

    .width50 {
        width: 50%
    }

    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0,0,0,.1);
    }

    span {
        font-size: 70%;
        font-weight: 400;
    }

    label {
        vertical-align: middle;
    }

    input {
        vertical-align: middle;
    }

    img {
        vertical-align: middle;
    }
</style>