<template>
  <div class="d2-theme-header-menu" ref="page" :class="{'is-scrollable': isScroll}" flex="cross:center">
    <div class="d2-theme-header-menu__content" ref="content" flex-box="1" flex>
      <div class="d2-theme-header-menu__scroll" ref="scroll" flex-box="0" :style="'transform: translateX(' + currentTranslateX + 'px);'">
        <el-menu mode="horizontal" :default-active="active" @select="handleMenuSelect">
          <template v-for="(menu, menuIndex) in header">
            <d2-layout-header-aside-menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex"/>
            <d2-layout-header-aside-menu-sub v-else :menu="menu" :key="menuIndex"/>
          </template>

            <!-- <div class="status">
              <el-row>
                <el-col :span="6"><img src="./icon-red.png">未签入</el-col>
                <el-col :span="6"><div class="status-text"></div></el-col>      
                <div class="status-icon">
                  <el-button-group>
                  <el-button class="status-button-top" icon="el-icon-service"></el-button>
                  <el-button class="status-button-top" icon="el-icon-phone"></el-button>
                  <el-button class="status-button-top" icon="el-icon-phone-outline" ></el-button>
                  <el-button class="status-button-top" icon="el-icon-check" ></el-button>
                  <el-button class="status-button-top" icon="el-icon-time"></el-button>
                  <el-button class="status-button-top" icon="el-icon-edit"></el-button>
                  </el-button-group>
                  <br>
                  <p style="font-size:8px; margin:8px 5px 0 0px; padding:0">签入  接听 签入  接听</p>
                  
                </div>
              </el-row>
            </div> -->

            <div class="status">
              <el-row>
                <el-col :span="2" class="status-left"><img src="./icon-red.png">未签入</el-col>
                <el-col :span="30">
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-service" ></el-button>
                    <p class="status-right-text">签入</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-phone" ></el-button>
                    <p class="status-right-text">接听</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-phone-outline" ></el-button>
                    <p class="status-right-text">静音</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-check" ></el-button>
                    <p class="status-right-text">工作</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-time" ></el-button>
                    <p class="status-right-text">示闲</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-edit" ></el-button>
                    <p class="status-right-text">学习</p>
                  </div>
                  <div class="status-icon">
                    <el-button class="status-button-top" icon="el-icon-service" ></el-button>
                    <p class="status-right-text">咨询</p>
                  </div>
                  <!-- <div class="status-icon">
                    <el-button class="status-button-top"><img src="./status-success.png"></el-button>
                    <p class="status-right-text">咨询</p>
                  </div> -->

                  
                </el-col>
                      
                
              </el-row>
            </div>



        </el-menu>
      </div>
    </div>
    <div v-if="isScroll" class="d2-theme-header-menu__prev" flex-box="0" @click="scroll('left')" flex="main:center cross:center">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div v-if="isScroll" class="d2-theme-header-menu__next" flex-box="0" @click="scroll('right')" flex="cross:center">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import d2LayoutMainMenuItem from '../components/menu-item/index.vue'
import d2LayoutMainMenuSub from '../components/menu-sub/index.vue'
export default {
  name: 'd2-layout-header-aside-menu-header',
  mixins: [
    menuMixin
  ],
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem,
    'd2-layout-header-aside-menu-sub': d2LayoutMainMenuSub
  },
  computed: {
    ...mapState('d2admin/menu', [
      'header'
    ])
  },
  data () {
    return {
      active: '',
      isScroll: false,
      scrollWidth: 0,
      contentWidth: 0,
      currentTranslateX: 0,
      throttledCheckScroll: null
    }
  },
  watch: {
    '$route.matched': {
      handler (val) {
        this.active = val[val.length - 1].path
      },
      immediate: true
    }
  },
  methods: {
    scroll (direction) {
      if (direction === 'left') {
        // 向右滚动
        this.currentTranslateX = 0
      } else {
        // 向左滚动
        if (this.contentWidth * 2 - this.currentTranslateX <= this.scrollWidth) {
          this.currentTranslateX -= this.contentWidth
        } else {
          this.currentTranslateX = this.contentWidth - this.scrollWidth
        }
      }
    },
    checkScroll () {
      let contentWidth = this.$refs.content.clientWidth
      let scrollWidth = this.$refs.scroll.clientWidth
      if (this.isScroll) {
        // 页面依旧允许滚动的情况，需要更新width
        if (this.contentWidth - this.scrollWidth === this.currentTranslateX) {
          // currentTranslateX 也需要相应变化【在右端到头的情况时】
          this.currentTranslateX = contentWidth - scrollWidth
          // 快速的滑动依旧存在判断和计算时对应的contentWidth变成正数，所以需要限制一下
          if (this.currentTranslateX > 0) {
            this.currentTranslateX = 0
          }
        }
        // 更新元素数据
        this.contentWidth = contentWidth
        this.scrollWidth = scrollWidth
        // 判断何时滚动消失: 当scroll > content
        if (contentWidth > scrollWidth) {
          this.isScroll = false
        }
      }
      // 判断何时滚动出现: 当scroll < content
      if (!this.isScroll && contentWidth < scrollWidth) {
        this.isScroll = true
        // 注意，当isScroll变为true，对应的元素盒子大小会发生变化
        this.$nextTick(() => {
          contentWidth = this.$refs.content.clientWidth
          scrollWidth = this.$refs.scroll.clientWidth
          this.contentWidth = contentWidth
          this.scrollWidth = scrollWidth
          this.currentTranslateX = 0
        })
      }
    }
  },
  mounted () {
    // 初始化判断
    // 默认判断父元素和子元素的大小，以确定初始情况是否显示滚动
    this.checkScroll()
    // 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
    this.throttledCheckScroll = throttle(this.checkScroll, 300)
    window.addEventListener('resize', this.throttledCheckScroll)
  },
  beforeDestroy () {
    // 取消监听
    window.removeEventListener('resize', this.throttledCheckScroll)
  }
}
</script>

<style>

.status {
  margin: 30px 10px 30px 50px;
  color: white;
}

.status-left {
  margin-left: 5px;
  margin-right: 250px;
}

.status-icon {
  float:left;
  margin-right: 5px;
}

.status-right-text {
  font-size:5px;
  margin: 1px 5px 0 5px; 
}

.status-button-top {
  font-size: 25px;
  padding: 3px;
  margin:0px; 
  box-shadow:0 2px 2px rgba(0, 0, 0, 0.35);
  background-color: transparent;
  color: white;
  border: 1px solid white;
  
}

</style>
