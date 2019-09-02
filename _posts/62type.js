const arr = [
    '0', '1','2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
]

function decTo62 (num, callback) {

    if(callback){



        const aaa = parseInt(num/62)
        const bbb = arr[num%62]

        if(aaa === 0){
            return bbb + callback
        }else {
            return decTo62(aaa,bbb)
        }

    }else {

    const aaa = parseInt(num/62)
    const bbb = arr[num%62]

    if(aaa === 0){
       return bbb
    }else {
    return decTo62(aaa, bbb)
    }

    }
}


class DecTo62  {
    static arr = [
        '0', '1','2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]

    static to62 (num, callback) {

        if(callback){

            const aaa = parseInt(num/62)
            const bbb = this.arr[num%62]

            if(aaa === 0){
                return bbb + callback
            }else {
                return this.to62(aaa,bbb)
            }

        }else {

            const aaa = parseInt(num/62)
            const bbb = this.arr[num%62]

            if(aaa === 0){
                return bbb
            }else {
                return this.to62(aaa, bbb)
            }
        }
    }

}