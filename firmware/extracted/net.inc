<script>
function FieldDisable(form) {
var truth = false;
	if (form.nDhcp.value == "DHCP") truth = true;
	form.myIP0.disabled = truth;
	form.myIP1.disabled = truth;
	form.myIP2.disabled = truth;
	form.myIP3.disabled = truth;
	form.myIP4.disabled = truth;
}
</script>
</head>
<body onload="FieldDisable(document.forms.nSettings);"> 