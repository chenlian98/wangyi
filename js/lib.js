//格式化评论
function comment(opinion) {
    if(opinion < 1000) {
        return opinion
    }else if (opinion >= 1000 && opinion < 10000){
        return (opinion / 1000).toFixed(1) + '千'
    }if(opinion >= 10000){
        return (opinion / 10000).toFixed(1) + '万'
    }
}

// console.log(comment(100))
// console.log(comment(1000))
// console.log(comment(40001))



// //取到 getQuery
function getQuery(key) {
    let queryArr = location.search.slice(1).split('&')
    for (let i = 0; i < queryArr.length; i++) {
        if (queryArr[i].split('=')[0] === key) {
            return queryArr[i].split('=')[1]
        }
    }
}
