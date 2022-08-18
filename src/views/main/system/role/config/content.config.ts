const contentTableConfig = {
  showIndex: true,
  showSelection: true,
  title: '角色列表',
  propList: [
    {
      prop: 'name',
      label: '角色名',
      minWidth: '100'
    },
    {
      prop: 'intro',
      label: '权限介绍',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200'
    },
    {
      prop: 'handler',
      label: '操作',
      minWidth: '150'
    }
  ]
}

export default contentTableConfig
