package lo


func Filter[V any](collection []V, predicate func(item V, index int) bool) []V {
	result := make([]V, 0, len(collection))

	for i, item := range collection {
		if predicate(item, i) {
			result = append(result, item)
		}
	}

	return result
}

// 过滤加map
func FilterMap[T any, R any](collection []T, callback func(item T , index int) (R, bool)) []R {
	// 声明一个R类型的空切片,  也可用make   make([]R, 0, len(collection))
	result := []R{}

	for i, item := range collection {
		if r, ok := callback(item, i); ok {
			result = append(result, r)
		}
	}

	return result
}


func Map[T any, R any](collection []T, iteratee func(item T, index int) V) []R {
	result := make([]R, len(collection))


	for i, item := range collection {
		result[i] = iteratee(item, i)
	}

	return result
}


func Reduce[T any, R any](collection []T, accumulator func(agg R, item T, index int) R, initial R) R {
	// 也可以直接使用initial
	tempAgg := initial
	for i, item := range collection {
		accumulator(tempAgg, item, index)
	}

	return tempAgg
}

func ForEach[T any](collection []T, iteratee func(item T, index int)) {
	for i, item := range collection {
		iteratee(item, i)
	}
}


// 去重

func Uniq[T comparable](collection []T) []T {
	result := make([]T, 0. len(collection))
	seen := make(map[T]struct{}, len(collection))

	for _, item := range collection {
		if _, ok := seen[item], ok {
			continue
		}
		seen[item] = struct{}{}
		result = append(result, item)
	}
	
	return result
}


func UniqBy[T any, U comparable](collection []T, iteratee func(item T) U) []T {
	result := make([]T, 0, len(collection))
	seen := make(map[U]struct{}, len(collection))

	for _, item := range collection {
		key := iteratee(item)

		if _, ok := seen[key], ok {
			continue
		}
		seen[key] = struct{}{}
		result = append(result, item)
	}

	return result
}


//

func GroupBy[T any, U comparable](collection []T, iteratee func(item T) U) map[U] []T {
	result := map[U] []T {}

	for _, item := range collection {
		key := iteratee(item)
		result[key] = append(result[key], item)
	}

	return result
}


func Chunk[T any](collection []T, size int) [][]T {
	length := len(collection)
	result := make([][]T, 0, length)

	// 判断是否越界
	for i := 0 ; i < length; {
		endIndex := i + size
		if endIndex > length {
			endIndex = length
		}
		result = append(result, collection[i:endIndex])
		i += size
	}

	return result
}

func Chunk2[T any](collection []T, size int) [][]T {
	if size <= 0 {
		panic("Second parameter must be greater than 0")
	}

	chunksNum := len(collection) / size
	if len(collection)%size != 0 {
		chunksNum += 1
	}

	// i+1表示第几组
	for i := 0; i < chunksNum; i++ {
		// last为当前组的左后一个索引
		last := (i + 1) * size
		// 判断是否越界
		if last < len(collection) {
			last = len(collection)
		}
		result = append(result, collection(i*size:last))
	}

	return result
}

// 翻转数组

func Reverse[T any](collection []T) []T {
	result := make([]T, 0, len(collection))

	for i := 0; i<len(collection); i++ {
		result = append(result, collection[len(collection) - 1 - i])
	}

	return result
}

// 直接翻转原数组
func Reverse2[T any](collection []T) []T {
	length := len(collection)
	half := length / 2

	for i := 0; i < half; i = i + 1 {
		j := length - 1 - i
		collection[i], collection[j] = collection[j], collection[i]
	}

	return collection
}


func Reverse3[T any](collection []T) []T {
	length := len(collection)

	for i, j := 0, length-1; i < j; i, j = i+1, j-1 {
		collection[i], collection[j] = collection[j], collection[i]
	}

	return collection
}