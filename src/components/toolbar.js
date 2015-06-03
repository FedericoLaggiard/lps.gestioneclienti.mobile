/**
 * Created by federicolaggiard on 03/06/15.
 */

module.exports = {

    controller: function(input){

        var data = input;

        function update(){
            console.log('update');

            var d = [
                {
                    id: 1,
                    key: 'AAAA'
                }
            ];

            data.setItems(d);

        }

        return{
            update: update
        }
    },

    view: function(ctrl, args){
        return m('button',{
            onclick: ctrl.update
        },'premi qui')
    }

};