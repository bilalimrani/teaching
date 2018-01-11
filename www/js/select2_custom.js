


 var base_url = localStorage.getItem('base_url');
$('.ajax').select2({
		 placeholder: "School",
        ajax: {
            url: `${base_url}/fetchschools`,
            dataType: 'json',
            type: "GET",
            quietMillis: 1000,
            data: function (term) {
                return {
                    keyword: term
                };
            },
            processResults: function (data, params) {
                var newData = [];
                data.response.forEach(function (i, item) {

                    newData.push({
                        id: i.id  
                        , text: i.name 
                    });
                });

                return {
                    results: newData,
                };
            },
            results: function (data) {

                return {
                    results: $.map(data.items, function (item) {
                        console.log("i",item)
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });