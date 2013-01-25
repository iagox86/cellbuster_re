<script>
function FieldDisable() {
FEn('hrs');
FEn('min');
FEn('sec');
FEn('date');
FInl('nNTP');
}
function FieldEnable(form) {
FDis('hrs');
FDis('min');
FDis('sec');
FDis('date');
FHid('nNTP');
}
function FieldStatus(status) {
if (status == "checked")
	FieldDisable();
else
	FieldEnable();
}
</script>