<template>
    <i-badge :variant="row.isActive? 'success' : 'danger'">{{ row.isActive ? 'Active' : 'Inactive'}}</i-badge>

</template>

<script>
export default {
    name: 'IsActive',
    props: ['row']
};
</script>