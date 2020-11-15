<template>
    <div class="media">
        <div class="media-body">
            <h6 class="media-heading" style="font-weight:700;">
                <slot name="author">
                    {{author}}
                </slot>
                <slot name="date">
                    <small class="text-muted">&middot; {{date}}</small>
                </slot>
            </h6>
            <slot name="comment">
                <h6 v-html="comment"></h6>
            </slot>

            <div class="media-footer">
                <slot name="actions">

                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import {Tooltip} from 'element-ui';
    export default {
        name: 'comment',
        components: {
          [Tooltip.name]: Tooltip
        },
        props: {
            avatar: {
                type: [String, Object],
                default: ''
            },
            author: {
                type: String,
                default: ''
            },
            date: {
                type: String,
                default: ''
            },
            comment: {
                type: String,
                default: ''
            },
            replies: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
<style>
</style>
