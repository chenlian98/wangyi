let main = $('main'); main = main[0]
let loading = $('.loading'); loading = loading[0]
loading.className = 'loading active'

let countPage = 1 //第几页
let pageSize = 10 //显示几条数据
let type = ''
function renderNews(id='BA10TA81wangning',star= 0,end = '-'+10) {
    console.log(`${id}/${star}${end}.html`)
    type = id //处理下一页的时候类型不同
    $.ajax({
        method:'GET',
        url:`https://3g.163.com/touch/reconstruct/article/list/${id}/${star}${end}.html`,
        //解决跨域
        dataType: 'jsonp',
        jsonpCallback: 'artiList',
        success(res) {
           isFlag = false
            loading.className = 'loading'
            $.each(res[type],function (index,item){
                let a = document.createElement('a');
                a.href = 'javascript:void(0)';
                a.className = 'item';
                a.insertAdjacentHTML('beforeend',`
                <div class="text">
                     <h1 class="title">${item.title}</h1>
                     <h5 class="message">${item.source}<span>${comment(item.commentCount)}跟帖</span></h5>
                     </div>
                     <img src=${item.imgsrc} alt="">
                </div>
               `)
                main.append(a);
            })
        },
        error(xhr) {
            // xhr.abort()
            loading.className = 'loading'
            // alert('已经到底部了')
            // console.log('error')
        }
    })
}

//切换 query的类型
// let genre = getQuery('genre') || 'BA10TA81wangning'
renderNews(getQuery('genre'))


//切换类名
let as = document.querySelectorAll('ul li a')
for (let i = 0; i < as.length; i++) {
    let h = as[i].getAttribute('href')
    // console.log(h.includes(getQuery('genre')))
    if (h.includes(getQuery('genre'))) {
        for (let j = 0; j < as.length; j++) {
            as[j].classList.remove('a-hide')
         }
        as[i].classList.add('a-hide')
        break
    }
}

let isFlag = false
//分页
let winH = $(window).height(); //页面可视区域高
    $(window).scroll(function() {
        let pageH = $(document.body).height() //整个网站页面总高度
        let scrollH = $(window).scrollTop(); //滚动条高度
        let differ = (pageH - winH - scrollH) //差值;
        console.log((differ).toFixed(2) < 0.08)
        if ( (differ).toFixed(2) < 0.08 ) {//代表滚到条已经到底
            if(!isFlag) {
                isFlag = true
                loading.className = 'loading active'
                countPage += 1
                let start = (countPage - 1) * pageSize
                let end = '-' + pageSize
                renderNews(type,start,end)
            }

        }
    })





/***
 *
 * https://3g.163.com/touch/reconstruct/article/list/BA10TA81wangning/10-10.html
 *
 * 娱乐类 全部
 *      BA10TA81wangning
 科技	BA8D4A3Rwangning
 旅游	BEO4GINLwangning
 明星	BD2AB5L9wangning
 音乐	BD2AC4LMwangning
 体育类	全部	BA8E6OEOwangning
 财经类	全部	BA8EE5GMwangning
 军事类	全部	BAI67OGGwangning
 军情	DE0CGUSJwangning

 */