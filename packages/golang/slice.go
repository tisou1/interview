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

func ForEach[T any](collection T, iteratee func(item T, index int)) {
	for i, item := range collection {
		iteratee(item, i)
	}
}

