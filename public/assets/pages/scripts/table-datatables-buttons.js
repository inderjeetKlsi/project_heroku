var TableDatatablesButtons = function () {

    var initTable1 = function () {
        var table = $('#overview_scoring_table');

        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }
    var initTable2 = function () {
        var table = $('#overview_offTheTee_table');

        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }
    var initTable3 = function () {
        var table = $('#overview_approachTheGreen_table');
        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }
    var initTable4 = function () {
        var table = $('#overview_aroundTheGreen_table');

        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }
    var initTable5 = function () {
        var table = $('#overview_putting_table');

        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }
    var initTable6 = function () {
        var table = $('#overview_streaks_table');
        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            }
        });
    }

    return {
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            initTable1();
            initTable2();
            initTable3();
            initTable4();
            initTable5();
            initTable6();
        }

    };

}();

jQuery(document).ready(function() {
    TableDatatablesButtons.init();
});