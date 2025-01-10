const { query } = require("express");

class ProductFilter {
    constructor( query,queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
       const keyword = this.queryStr.keyword?{
        $regex:this.queryStr.keyword,
        $options:"i"
       }:{}
       this.query = this.query.find({...keyword})
       return this;
    }
    filter(){
        const queryCopy = {...this.queryStr};
        const deleteArea= ["keyword","page","limit"];
        deleteArea.forEach(item => delete queryCopy[item]);
        const queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }
    pagination(){}



}

module.exports = ProductFilter