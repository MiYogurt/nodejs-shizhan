<template lang="pug">
footer.footer: .container
  .columns.is-multiline
    .column.is-3#logo-panel
      .tile.is-ancestor
        .tile.is-4
          img.footer-logo(src="/public/footer-logo.png")
        .tile.is-8.is-hidden-touch.is-vertical
          h3.title.is-3.has-text-weight-normal 猫览
          p.subtitle.has-text-grey-light.has-text-weight-normal 向世界展示你的才华
      p.is-size-6.has-text-grey-light.has-text-weight-normal 猫览，每一位设计瞄的温馨家园，在这里分享、传递设计
      ul.social-link
        li: a(href="javascript:void(0);"): span.icon.is-medium: i.fab.fa-dribbble.fa-lg
        li: a(href="javascript:void(0);"): span.icon.is-medium: i.fab.fa-twitter.fa-lg
        li: a(href="javascript:void(0);"): span.icon.is-medium: i.fab.fa-facebook.fa-lg
        li: a(href="javascript:void(0);"): span.icon.is-medium: i.fab.fa-instagram.fa-lg
        li: a(href="javascript:void(0);"): span.icon.is-medium: i.fas.fa-globe.fa-lg
    .column.is-3.more-link
      .tile.is-ancestor: .tile.is-vertical
        .tile.is-parent.no-padding-lr
          .tile.is-child.is-4
            h3.title.is-6.is-marginless 更多链接
          .tile.is-child.is-hidden-touch
            h3.title.is-6.is-marginless 关于
        .tile
          //- ul.tile.is-parent.no-padding-lr.flex-wrap
          //-   li.tile.is-4: a.is-size-7.has-text-grey-light(href="#") UI 中国 
          //-   li.tile.is-4: a.is-size-7.has-text-grey-light(href="#") 联系我们 
          //-   li.tile.is-4: a.is-size-7.has-text-grey-light(href="#") 意见反馈 
          //-   li.tile.is-4: a.is-size-7.has-text-grey-light(href="#") 用户反馈 
          ul.tile.is-flex.link
            li: a.is-size-6(href="#") UI 中国
            li: a.is-size-6(href="#") 联系我们
            li: a.is-size-6(href="#") 意见反馈
            li: a.is-size-6(href="#") 用户反馈
            li: a.is-size-6(href="#") 版权声明
            li: a.is-size-6(href="#") 用户歇息
    .column.is-3.campaign
      h1.title.is-6 活动
      img(src="http://via.placeholder.com/350x150")
      p.is-size-7 参加活动，获取新款 kindle
    .column.is-3
      h3.title.is-6.is-marginless 统计
      .level
        .level-item.has-text-centered
          div
            .heading 海报
            .title 5,623,321
        .level-item.has-text-centered
          div
            .heading 文章
            .title 223,321
    .column.is-12.is-size-7.has-text-grey-lighter#copyright
      | 京ICP备0789189798号-1 / 京公网安备318789791123号 / Powered by 2018-2022 miao.net
</template>

<script lang="ts">
export default {
  name: 'AppFooter'
}
</script>

<style lang="sass" scoped>
.footer
  background: transparent
.title.is-3 ~ .subtitle
  margin-top: -1rem
.footer-logo
  object-fit: contain
  width: 100%
  height: 73px
.social-link 
  padding: .7em 0
  li
    display: inline-block
    a
      color: #e6e6e6
      &:hover 
        color: $link

#logo-panel
  margin-bottom: 0
  padding-bottom: 0
#copyright
  padding: 1em
.more-link 
  +mobile
    .tile.is-ancestor
      margin: 0
  .link 
    width: 100%
    flex-wrap: wrap
    li
      width: 33%
      padding: .4em 0
      a
        color: $grey
        &:hover
          color: $link
.campaign 
  padding-bottom: 0
  img
    width: 100%
  p
    padding-top: .7em
.flex-wrap
  flex-wrap: wrap
  li
    padding: .1em 0
  p
    pading-top: .2em

.level
  flex-direction: column
  &-item
    padding: 1.3em
    +mobile
      padding: 0.7em
</style>