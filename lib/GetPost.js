export default class GetPost {
  data = null
  lang = null
  extra = null
  constructor(data, lang,extra) {
    this.data = data
    this.lang = lang
    this.extra = extra
  }
  findPost(row, col, type) {
    const res = this.data.edges.find(post => post.node[this.extra].row == row && post.node[this.extra].column == col);
    if (this.lang == "farsi") {
      return res ? (type == "title" ? res.node.title : res.node.content) : "data not found!"
    }
    else {
      return res ? (type == "title" ? res.node.postsInfo.englishtitle : res.node.postsInfo.englishdescription) : "data not found!"
    }
  }
}