class Apifeature {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    Search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
    main() {
      const queryCopy = { ...this.queryStr };
  
  
      this.query = this.query.find({Parent_id:null});
      // console.log(this)
  
      return this;
    }
    sub(id) {
      const queryCopy = { ...this.queryStr };
  
  
      this.query = this.query.find({Parent_id:id});
      // console.log(this)
  
      return this;
    }
    product(lastcategory_id) {
      const queryCopy = { ...this.queryStr };
  
  
      this.query = this.query.find({lastcategory_id:lastcategory_id});
      // console.log(this)
  
      return this;
    }
}
module.exports=Apifeature
