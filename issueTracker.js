var urlToGetAllOpenBugs = "https://api.github.com/repos/HolyKadylo/apache_distribution/issues?state=open";
var urlToGetAllOpenBugs2 = "https://api.github.com/repos/HolyKadylo/python_distribution/issues?state=open";

$(document).ready(function () {
    $.getJSON(urlToGetAllOpenBugs, function (allIssues) {
        $("div").append("################</br>");
        $.each(allIssues, function (i, issue) {
            $("div")
                .append("<b>" + " - " + issue.title + "</b></br>")
                .append("created at: " + issue.created_at + "</br>")
                .append(issue.body + "</br>");
        });
    });
    $.getJSON(urlToGetAllOpenBugs2, function (allIssues) {
        $.each(allIssues, function (i, issue) {
            $("div")
                .append("<b>" + " - " + issue.title + "</b></br>")
                .append("created at: " + issue.created_at + "</br>")
                .append(issue.body + "</br>");
        });
    });
});
