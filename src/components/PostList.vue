<template>
  <div class="PostList">
    <!-- 在数据未返回的时候显示这个整个正在加载的动画。-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <!--主题列表：https://cnodejs.org/api/v1/topics-->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="toobar">
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'all'
              }
              }"
              class="tag_item"
            >
              <span class="tab_link">全部</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'good'
              }
            }"
            >
              <span class="tab_link">精华</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'share'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">分享</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'ask'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">问答</span>
            </router-link>
            <router-link
              :to="{
              name:'tab',
              params:{
                tab:'job'
              }
            }"
              class="tag_item"
            >
              <span class="tab_link">招聘</span>
            </router-link>
          </div>
        </li>
        <li v-for="post in posts">
          <!--头像-->
          <router-link
            :to="{
            name:'user_info',
            params:{
                name: post.author.loginname
            }
            }"
          >
            <img :src="post.author.avatar_url" alt />
          </router-link>

          <!--回复/浏览-->
          <span>
            <span class="reply_count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>
          <!--帖子的分类-->
          <span
            :class="[{put_good:(post.good === true), put_top:(post.top === true),
            'topiclist-tab':(post.good !== true && post.top !== true)}]"
          >
            <span>{{post | tabFormatter}}</span>
          </span>
          <!--标题-->
          <router-link
            :to="{
            name: 'post_content',
            params: {
                id: post.id,
                name: post.author.loginname
            }
            }"
          >
            <span>{{post.title}}</span>
          </router-link>
          <!--最终回复时间-->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <pagination @handle="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from "./Pagination";
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [], // 代表页面的列表数组
      put_top: true,
      put_good: false,
      postpage: 1,
      goodpost: []
    };
  },
  components: {
    pagination
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            tab: this.$route.params.tab,
            page: this.postpage,
            limit: 20
          }
        })
        .then(res => {
          this.isLoading = false; // 加载成功，取消动画。
          this.posts = res.data.data;
        })
        .catch(err => {
          // 处理失败后的问题
          console.log(err);
        });
    },
    renderList(value) {
      this.postpage = value;
      this.getData();
    },
    changeActive() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  },
  beforeMount() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getData(); //在页面加载之前获取数据
  },
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
