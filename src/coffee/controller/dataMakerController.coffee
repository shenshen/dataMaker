define [], ()->
   _ = require("underscore/underscore")
   textData = require("../data/textData")
   angular.module "dataMaker", ["ngMaterial"]
   .controller "AppCtrl", [
      "$scope", "$mdDialog", ($scope, $mdDialog)->
         tempId = 1
         $scope.types =
            'array':
               name: "数组"
               category: "数值类型"
               _hasChildren: ()->
                  true
               opt:
                  valuein: ""

               getter: (opt)->
                  return {
                  run: ->
                  }
            'object':
               name: "对象"
               category: "数值类型"
               _hasChildren: ()->
                  return true
               getter: ()->
                  return {
                  run: ->
                     {}
                  }
            'email':
               name: "Email"
               category: "人相关的"
               example: "example@qq.com"
               defaultValue: ""
               getter: (opt)->
                  debugger
            'string':
               name: "字符串"
               category: "数值类型"
               opt:
                  max: 10  #最大长度
                  min: 0  #最小长度
                  valuein: ""
                  textType: 1 #1=chineseText 2=englishSingle 3=englishText
               getter: (opt)->
                  if opt.valuein
                     result = opt.valuein.split "|"
                  else
                     text = textData[opt.textType]
                  return {
                  run: ()->
                     if opt.valuein
                        return result[parseInt(Math.random() * result.length)]
                     else
                        result = ""
                        while result.length <= opt.min
                           max = opt.max - result.length
                           min = opt.min - result.length
                           strIndex = parseInt(Math.random() * (max - min + 1) + min)
                           result += text.substring 0, strIndex
                     return result

                  }
            'date':
               name: "日期"
               disabled: true
            'phone':
               name: "手机号"
               disabled: true
            'country':
               name: "国家"
               disabled: true

         $scope.struct =
            root:
               type: "object"
               name: "root"
               level: 0
               opt: {}
               _child: $scope.types['object']._hasChildren
               _childItem: {}
         $scope.addStruct = (node)->
            node._childItem = node._childItem || {}
            node._childItem["data#{tempId}"] = {
               level: node.level + 1
               name: "data#{tempId++}"
            }
         $scope.delStruct = (parent, key, value)->
            delete parent._childItem[key]
         $scope.changeType = (node)->
            node._child = $scope.types[node.type]._hasChildren
            node._childItem = {}
            node.opt = {}
            if node.type == 'array'
               node.opt.childType = 0
            if node.type == "string"
               node.opt.textType = "chineseText"
         itemGetter = null
         $scope.doCreate = ()->
            result = ""
            renderArray = (obj)->
               a = []
               count = obj.opt.childLength
               while count-- > 0
                  _.each obj._childItem, (value)->
                     if value.type is "object"
                        a.push renderObject(value)
                     else if value.type is "array"
                        a.push renderArray(value)
                     else
                        a.push $scope.types[value.type].getter(value.opt).run()
               return a

            renderObject = (obj)->
               a = {}
               _.each obj._childItem, (value)->
                  if value.type is "object"
                     a[value.name] = renderObject(value)
                  else if value.type is "array"
                     a[value.name] = renderArray(value)
                  else
                     a[value.name] = $scope.types[value.type].getter(value.opt).run()
               return a

            if $scope.struct.root.type is "array"
               result = renderArray $scope.struct.root
            else if $scope.struct.root.type is "object"
               result = renderObject $scope.struct.root
            else result = $scope.types[$scope.struct.root.type].getter($scope.struct.root.opt).run()
            return result
         $scope.doCreateJson = (ev)->
            result = $scope.doCreate()
            $mdDialog.show(
               $mdDialog.alert()
               .parent(angular.element(document.body))
               .title("结果")
               .content(JSON.stringify result)
               .ariaLabel("结果")
               .ok("确定")
               .targetEvent(ev)
            )
         $scope.doCreateJs = (ev)->
            result = $scope.doCreate()
            $mdDialog.show(
               $mdDialog.alert()
               .parent(angular.element(document.body))
               .title("结果")
               .content("var data = #{JSON.stringify(result)}")
               .ariaLabel("结果")
               .ok("确定")
               .targetEvent(ev)
            )
         $scope.doCreateMySql = (ev)->
            result = $scope.doCreate()
            $mdDialog.show(
               $mdDialog.alert()
               .parent(angular.element(document.body))
               .title("结果")
               .content("
DROP TABLE `myTable`;

CREATE TABLE `myTable` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `name` varchar(255) default NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `myTable` (`name`) VALUES (\"Len\"),(\"Brendan\"),(\"Allistair\"),(\"Talon\"),(\"Keefe\"),(\"Hilel\"),(\"Ezra\"),(\"Duncan\"),(\"Talon\"),(\"Ezra\");
INSERT INTO `myTable` (`name`) VALUES (\"Tyrone\"),(\"Caleb\"),(\"Gregory\"),(\"Lucas\"),(\"Brenden\"),(\"Dennis\"),(\"Brendan\"),(\"Armand\"),(\"Ezekiel\"),(\"Stephen\");
INSERT INTO `myTable` (`name`) VALUES (\"Joseph\"),(\"Duncan\"),(\"Tyrone\"),(\"Alden\"),(\"Vaughan\"),(\"Macaulay\"),(\"Abraham\"),(\"Thaddeus\"),(\"Brandon\"),(\"Brent\");
INSERT INTO `myTable` (`name`) VALUES (\"Orson\"),(\"Chase\"),(\"Brady\"),(\"Graham\"),(\"Xander\"),(\"Neil\"),(\"Brady\"),(\"Donovan\"),(\"Ahmed\"),(\"Zeph\");
INSERT INTO `myTable` (`name`) VALUES (\"Rudyard\"),(\"Quinlan\"),(\"Neil\"),(\"Rigel\"),(\"Phillip\"),(\"Lucas\"),(\"Quamar\"),(\"Dustin\"),(\"Devin\"),(\"Julian\");
INSERT INTO `myTable` (`name`) VALUES (\"Clarke\"),(\"Ethan\"),(\"Adam\"),(\"Armand\"),(\"Drew\"),(\"George\"),(\"Basil\"),(\"Ignatius\"),(\"Norman\"),(\"Dexter\");
INSERT INTO `myTable` (`name`) VALUES (\"Ian\"),(\"Herrod\"),(\"Ashton\"),(\"August\"),(\"Josiah\"),(\"James\"),(\"Patrick\"),(\"Timothy\"),(\"Phelan\"),(\"Baker\");
INSERT INTO `myTable` (`name`) VALUES (\"Lucius\"),(\"Jameson\"),(\"Nissim\"),(\"Donovan\"),(\"Eagan\"),(\"Caldwell\"),(\"Reed\"),(\"Uriel\"),(\"Griffith\"),(\"Keaton\");
INSERT INTO `myTable` (`name`) VALUES (\"Avram\"),(\"Maxwell\"),(\"Giacomo\"),(\"Aristotle\"),(\"Ivor\"),(\"Clarke\"),(\"Joel\"),(\"Ali\"),(\"Dexter\"),(\"Xenos\");
INSERT INTO `myTable` (`name`) VALUES (\"Plato\"),(\"Colby\"),(\"Rafael\"),(\"Vance\"),(\"Samuel\"),(\"Daquan\"),(\"Tad\"),(\"Isaiah\"),(\"Wayne\"),(\"David\");

")
               .ariaLabel("结果")
               .ok("确定")
               .targetEvent(ev)
            )

         $scope.changeArrayType = (node)->
            node._childItem = {}
         return this
   ]